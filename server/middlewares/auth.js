/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const model = require('../models');

const { User } = model;

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(400).send({
        status: 'error',
        message: 'Token is not provided',
      });
    }
    try {
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
};

module.exports = Auth;
