require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const model = require('../models');
const asyncMiddleware = require('../middlewares/async');

const { Op } = Sequelize;

const { User, CreatorProfile } = model;

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
    id: newUser.id,
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
      id: newUser.id,
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

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).send({
      status: 'Error',
      error: 'Invalid username or password',
    });
  }

  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    typeId: user.typeId,
    siteAdmin: user.siteAdmin,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 });

  return res.status(200).send({
    status: 'success',
    data: {
      token,
      id: user.id,
    },
  });
});
