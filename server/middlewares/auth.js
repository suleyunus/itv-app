/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const model = require('../models');

const { Op } = sequelize;
const { User, Group, GroupMember } = model;

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const getToken = req.headers.authorization;
    if (!getToken) {
      return res.status(400).send({
        status: 'error',
        message: 'Token is not provided',
      });
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, process.env.JWT_KEY);
      const user = await User
        .findOne({
          where: {
            id: decoded.userId,
          },
        });
      if (!user) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async verifyOwner(req, res, next) {
    const userId = parseInt(req.params.userId, 10);

    if (req.user.id !== userId) {
      return res.status(400).send({
        status: 'Error',
        message: 'You do not have the required permissions',
      });
    }

    next();
  },

  async verifyGroupMember(req, res, next) {
    const groupId = parseInt(req.params.groupId, 10);
    const group = await Group
      .findOne({
        where: {
          id: groupId,
        },
      });

    if (!group) {
      return res.status(400).send({
        status: 'Error',
        message: `Group with Id: ${groupId} not found`,
      });
    }

    const groupMember = await GroupMember
      .findOne({
        where: {
          [Op.and]: [{ groupId }, { userId: req.user.id }],
        },
      });

    if (!groupMember) {
      return res.status(400).send({
        status: 'Error',
        message: 'You do not have the required permissions',
      });
    }
    next();
  },

  async verifyGroupAdmin(req, res, next) {
    const groupId = parseInt(req.params.groupId, 10);
    const group = await Group
      .findOne({
        where: {
          id: groupId,
        },
      });

    if (!group) {
      return res.status(400).send({
        status: 'Error',
        message: `Group with Id: ${groupId} not found`,
      });
    }

    const groupMember = await GroupMember
      .findOne({
        where: {
          [Op.and]: [{ groupId }, { userId: req.user.id }],
        },
      });

    if (!groupMember) {
      return res.status(400).send({
        status: 'Error',
        message: 'You do not have the required permissions',
      });
    }

    if (groupMember.groupAdmin !== true) {
      return res.status(400).send({
        status: 'Error',
        message: 'You do not have the required permissions',
      });
    }
    next();
  },

  async verifyOwnerOrAdmin(req, res, next) {
    const groupId = parseInt(req.params.groupId, 10);
    const memberId = parseInt(req.params.memberId, 10);
    const group = await Group
      .findOne({
        where: {
          id: groupId,
        },
      });

    if (!group) {
      return res.status(400).send({
        status: 'Error',
        message: `Group with Id: ${groupId} not found`,
      });
    }

    const groupMember = await GroupMember
      .findOne({
        where: {
          [Op.and]: [{ groupId }, { userId: req.user.id }],
        },
      });

    if (!groupMember) {
      return res.status(400).send({
        status: 'Error',
        message: 'You do not have the required permissions',
      });
    }

    if (groupMember.groupAdmin !== true && memberId !== req.user.id) {
      return res.status(400).send({
        status: 'Error',
        message: 'You do not have the required permissions',
      });
    }
    next();
  },
};

module.exports = Auth;
