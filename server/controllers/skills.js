const model = require('../models');
const asyncMiddleware = require('../middlewares/async');
const Response = require('../util/response');

const { Skill } = model;

/**
 * Get all skills
 */

exports.getSkill = asyncMiddleware(async (req, res) => {
  const data = await Skill
    .findAll();

  return Response.HTTP_200_OK(data, res);
});
