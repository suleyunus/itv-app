const model = require('../models');
const asyncMiddleware = require('../middlewares/async');
const Response = require('../util/response');

const { UrbanCenter } = model;

/**
 * Get all urban centers
 */

exports.getUrbanCenters = asyncMiddleware(async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    const data = await UrbanCenter
      .findAll();

    return Response.HTTP_200_OK(data, res);
  }

  const {
    county,
  } = req.query;

  const countyId = parseInt(county, 10);

  const data = await UrbanCenter
    .findAll({
      where: {
        countyId,
      },
    });

  return Response.HTTP_200_OK(data, res);   
});
