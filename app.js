const express = require('express');

const Cors = require('cors');

const logger = require('morgan');

const bodyParser = require('body-parser');

const routes = require('./server/routes');

const app = express();

app.use(Cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

module.exports = app;
