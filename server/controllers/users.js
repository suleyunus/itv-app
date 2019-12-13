require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sgMail = require('@sendgrid/mail');
const model = require('../models');
const asyncMiddleware = require('../middlewares/async');
const Response = require('../util/response');
const { uploader } = require('../config/cloudinaryConfig');
const { dataUri } = require('../middlewares/multer');

const myKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(myKey);

// const dataUri = new DataUri();
const { Op } = Sequelize;

const {
  User,
  CreatorProfile,
  Skill,
  UrbanCenter,
  Type,
} = model;

const SALT_ROUNDS = 10;

exports.creatorSignup = asyncMiddleware(async (req, res) => {
  const {
    firstName,
    lastName,
    stageName,
    email,
    phone,
    password,
    urbanCenter,
    majorSkill,
    minorSkill,
    agreeToLicense,
  } = req.body;

  const existingEmail = await User
    .findOne({
      where: {
        email,
      },
    });

  if (existingEmail) {
    return Response.HTTP_400_BAD_REQUEST('Account with that email address exists', res);
  }

  const existingPhone = await User
    .findOne({
      where: {
        phone,
      },
    });

  if (existingPhone) {
    return Response.HTTP_400_BAD_REQUEST('Account with that phone number exists', res);
  }

  const existingUrbanCenter = await UrbanCenter
    .findOne({
      where: {
        id: urbanCenter,
      },
    });

  if (!existingUrbanCenter) {
    return Response.HTTP_400_BAD_REQUEST(`No urban center with ID: ${urbanCenter}` , res);
  }

  const existingMajorSkill = await Skill
    .findOne({
      where: {
        id: majorSkill,
      },
    });

  if (!existingMajorSkill) {
    return Response.HTTP_400_BAD_REQUEST(`No skill with ID: ${majorSkill}`, res);
  }

  const existingMinorSkill = await Skill
    .findOne({
      where: {
        id: minorSkill,
      },
    });

  if (!existingMinorSkill) {
    return Response.HTTP_400_BAD_REQUEST(`No skill with ID: ${minorSkill}`, res);
  }

  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

  const newUser = await User
    .create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      typeId: 1,
      siteAdmin: false,
    });

  const newCreator = await CreatorProfile
    .create({
      userId: newUser.id,
      stageName,
      urbanCenterId: urbanCenter,
      majorSkillId: majorSkill,
      minorSkillId: minorSkill,
      agreeToLicense,
    });

  const payload = {
    userId: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    typeId: newUser.typeId,
    siteAdmin: newUser.siteAdmin,
    creatorProfileId: newCreator.id,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 });

  return res.status(201).send({
    status: 'success',
    message: 'Creator successfully created',
    data: {
      token,
      userId: newUser.id,
    },
  });
});

exports.login = asyncMiddleware(async (req, res) => {
  const {
    username,
    password,
  } = req.body;

  const user = await User
    .findOne({
      where: {
        [Op.or]: [{ email: username }, { phone: username }],
      },
    });

  if (!user) {
    return Response.HTTP_404_NOT_FOUND('Cannot find your account', res);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).send({
      status: 'Error',
      error: 'Invalid username or password',
    });
  }

  const payload = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    typeId: user.typeId,
    siteAdmin: user.siteAdmin,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' });

  return res.status(200).send({
    status: 'success',
    data: {
      token,
      userId: user.id,
    },
  });
});


exports.passwordReset = asyncMiddleware(async (req, res) => {
  const {
    email,
  } = req.body;

  const user = await User
    .findOne({
      where: {
        email,
      },
    });

  if (!user) {
    return Response.HTTP_404_NOT_FOUND('Cannot find your account', res);
  }

  const payload = {
    id: user.id,
    email,
  };

  const secret = `${user.password}-${user.createdAt}`;

  const token = jwt.sign(payload, secret, { expiresIn: '0.25h' });

  const msg = {
    to: email,
    from: 'test@example.com',
    subject: 'Password Reset',
    html: `Go to the following link to reset your password: 
      http://41.212.80.190/imaratv/reset.php?id=${user.id}&token=${token}`,
  };

  // eslint-disable-next-line no-unused-vars
  await sgMail.send(msg);

  return res.status(200).send({
    status: 'Success',
    message: 'Password reset email has been sent successfully',
  });
});


exports.passwordResetConfirm = asyncMiddleware(async (req, res) => {
  const {
    id,
    token,
    password,
    confirmPassword,
  } = req.body;

  const user = await User
    .findByPk(id);

  if (!user) {
    return Response.HTTP_404_NOT_FOUND('Cannot find your account', res);
  }

  const secret = `${user.password}-${user.createdAt}`;
  // eslint-disable-next-line no-unused-vars
  const decoded = await jwt.verify(token, secret);

  if (password !== confirmPassword) {
    return Response.HTTP_400_BAD_REQUEST('Passwords must match', res);
  }

  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

  // eslint-disable-next-line no-unused-vars
  const resetPassword = await user
    .update({
      password: hashedPassword,
    });

  return res.status(200).send({
    status: 'Success',
    message: 'Your password has been successfully reset',
  });
});


exports.changePassword = asyncMiddleware(async (req, res) => {
  const {
    newPassword,
    oldPassword,
  } = req.body;

  const user = await User
    .findByPk(req.user.id);

  if (!bcrypt.compareSync(oldPassword, user.password)) {
    return Response.HTTP_400_BAD_REQUEST('Verification of old password failed', res);
  }

  const hashedPassword = bcrypt.hashSync(newPassword, SALT_ROUNDS);
  // eslint-disable-next-line no-unused-vars
  const changedPassword = await user
    .update({
      password: hashedPassword,
    });

  return res.status(200).send({
    status: 'Success',
    message: 'Your password has been successfully changed',

  });
});

exports.getUserById = asyncMiddleware(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const user = await User
    .findOne({
      where: {
        id: userId,
      },
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'phone',
        'bio',
        'avatarUrl',
        'typeId',
        'siteAdmin',
        'lastLogin',
        'createdAt',
        'updatedAt',
      ],
    });

  if (!user) {
    return Response.HTTP_404_NOT_FOUND(`User with id: ${userId} not found`, res);
  }

  if (user.typeId === 1) {
    const data = await CreatorProfile
      .findOne({
        where: {
          userId,
        },
        attributes: [
          'userId',
          'stageName',
        ],
        include: [
          {
            model: User,
            attributes: [
              'id',
              'firstName',
              'lastName',
              'email',
              'phone',
              'bio',
              'avatarUrl',
              'siteAdmin',
              'lastLogin',
              'createdAt',
              'updatedAt',
            ],
            as: 'userProfile',
            include: [
              {
                model: Type,
                attributes: [
                  'type',
                ],
                as: 'type',
              },
            ],
          },
          {
            model: Skill,
            attributes: [
              'id',
              'skill',
            ],
            as: 'majorSkill',
          },
          {
            model: Skill,
            attributes: [
              'id',
              'skill',
            ],
            as: 'minorSkill',
          },
          {
            model: UrbanCenter,
            attributes: [
              'id',
              'urbanCenter',
            ],
          },
        ],
      });

    return Response.HTTP_200_OK(data, res);
  }

  return Response.HTTP_200_OK(user, res);
});


/**
 * Update user avatar
 */

exports.updateUserAvatar = asyncMiddleware(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const foundUser = await User
    . findOne({
      where: {
        id: userId,
      },
    });

  if (!foundUser) {
    return Response.HTTP_404_NOT_FOUND('Cannot find your account', res);
  }

  const avatar = req.file;
  const file = dataUri(avatar);

  const newAvatar = await uploader.upload(
    file,
    {
      use_filename: true,
      folder: 'avatars/creators',
    },
  );

  if (foundUser.avatarUrl) {
    const splitUrl = foundUser.avatarUrl.split('/');
    // eslint-disable-next-line camelcase
    const public_id = `${splitUrl[7]}/${splitUrl[8]}/${splitUrl[9].split('.')[0]}`;
    // eslint-disable-next-line no-unused-vars
    const deleteAvatar = await uploader.destroy(public_id);
  }

  const updatedUserProfile = await foundUser
    .update({
      avatarUrl: newAvatar.url || foundUser.avatarUrl,
    });

  const data = {
    userId: updatedUserProfile.id,
    avatarUrl: updatedUserProfile.avatarUrl,
  };

  return res.status(200).send({
    status: 'Success',
    message: 'Avatar updated successfully',
    data,
  });
});

/**
 * Delete user avatar
 */

exports.deleteUserAvatar = asyncMiddleware(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const foundUser = await User
    . findOne({
      where: {
        id: userId,
      },
    });

  if (!foundUser) {
    return Response.HTTP_404_NOT_FOUND('Cannot find your account', res);
  }

  const {
    avatarUrl,
  } = foundUser;

  if (!avatarUrl) {
    return Response.HTTP_404_NOT_FOUND('There is no image to delete', res);
  }

  const splitUrl = avatarUrl.split('/');
  // eslint-disable-next-line camelcase
  const public_id = `${splitUrl[7]}/${splitUrl[8]}/${splitUrl[9].split('.')[0]}`;
  // eslint-disable-next-line no-unused-vars
  const deleteAvatar = await uploader.destroy(public_id);

  // eslint-disable-next-line no-unused-vars
  const updatedUser = await foundUser
    .update({
      avatarUrl: null,
    });

  return Response.HTTP_200_OK('Avatar deleted successfully', res);
});

/**
 * Update creator profile
 */

exports.updateCreatorDetails = asyncMiddleware(async (req, res) => {
  const creatorId = parseInt(req.params.userId, 10);
  const foundCreator = await CreatorProfile
    . findOne({
      where: {
        userId: creatorId,
      },
    });

  if (!foundCreator) {
    return Response.HTTP_404_NOT_FOUND('Cannot find your account', res);
  }

  const {
    firstName,
    lastName,
    stageName,
    bio,
    urbanCenter,
    majorSkill,
    minorSkill,
  } = req.body;

  // eslint-disable-next-line no-unused-vars
  const updatedCreatorDetails = await foundCreator
    .update({
      stageName: stageName || foundCreator.stageName,
      urbanCenterId: urbanCenter || foundCreator.urbanCenterId,
      majorSkillId: majorSkill || foundCreator.majorSkillId,
      minorSkill: minorSkill || foundCreator.minorSkillId,
    });

  const userProfile = await User
    .findOne({
      where: {
        id: creatorId,
      },
    });

  // eslint-disable-next-line no-unused-vars
  const updatedUserProfile = await userProfile
    .update({
      firstName: firstName || userProfile.firstName,
      lastName: lastName || userProfile.lastName,
      bio: bio || userProfile.bio,
    });

  const data = await CreatorProfile
    .findOne({
      where: {
        userId: creatorId,
      },
      attributes: [
        'userId',
        'stageName',
      ],
      include: [
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'phone',
            'bio',
            'avatarUrl',
            'siteAdmin',
            'lastLogin',
            'createdAt',
            'updatedAt',
          ],
          as: 'userProfile',
          include: [
            {
              model: Type,
              attributes: [
                'type',
              ],
              as: 'type',
            },
          ],
        },
        {
          model: Skill,
          attributes: [
            'id',
            'skill',
          ],
          as: 'majorSkill',
        },
        {
          model: Skill,
          attributes: [
            'id',
            'skill',
          ],
          as: 'minorSkill',
        },
        {
          model: UrbanCenter,
          attributes: [
            'id',
            'urbanCenter',
          ],
        },
      ],
    });

  return res.status(200).send({
    status: 'Success',
    message: 'Profile updated successfully',
    data,
  });
});
