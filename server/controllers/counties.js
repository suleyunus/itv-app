const model = require('../models');
const asyncMiddleware = require('../middlewares/async');
const Response = require('../util/response');

const { County } = model;

/**
 * Get all counties
 */

exports.getCounties = asyncMiddleware(async (req, res) => {
  const data = await County
    .findAll({
      attributes: [
        'id',
        'county',
      ],
    });

  return Response.HTTP_200_OK(data, res);
});
