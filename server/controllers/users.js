require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sgMail = require('@sendgrid/mail');
const model = require('../models');
const asyncMiddleware = require('../middlewares/async');
const Response = require('../util/response');

const myKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(myKey);

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
