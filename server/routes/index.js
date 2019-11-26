const user = require('./users');
const group = require('./groups');
const skill = require('./skills');

const apiPrefix = '/api/v1';

const route = (app) => {
  app.use(apiPrefix, user);
  app.use(apiPrefix, group);
  app.use(apiPrefix, skill);
};

module.exports = route;
