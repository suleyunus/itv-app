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
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password: hashedPassword,
      type_id: 1,
      site_admin: false,
    });

  const newCreator = await CreatorProfile
    .create({
      user_id: newUser.id,
      stage_name: stageName,
      urban_center_id: urbanCenter,
      major_skill_id: majorSkill,
      minor_skill_id: minorSkill,
      agree_to_license: agreeToLicense,
    });

  const payload = {
    id: newUser.id,
    first_name: firstName,
    last_name: lastName,
    type_id: 1,
    site_admin: false,
    creator_profile_id: newCreator.id,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 });

  res.status(201).send({
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
    first_name: user.first_name,
    last_name: user.last_name,
    type_id: user.type_id,
    site_admin: user.site_admin,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 });

  res.status(200).send({
    status: 'success',
    data: {
      token,
      id: user.id,
    },
  });
});
