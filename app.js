const express = require('express');
const Cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const { cloudinaryConfig } = require('./server/config/cloudinaryConfig');

const app = express();

app.use(Cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('*', cloudinaryConfig);

routes(app);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    status: 'Error',
    message: err.message,
    error: {},
  });
});

module.exports = app;
