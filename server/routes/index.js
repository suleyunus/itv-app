const user = require('./users');
const group = require('./groups');

const apiPrefix = '/api/v1';

const route = (app) => {
  app.use(apiPrefix, user);
  app.use(apiPrefix, group);
};

module.exports = route;
