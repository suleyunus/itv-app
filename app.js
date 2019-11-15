const express = require('express');

const Cors = require('cors');

const logger = require('morgan');

const bodyParser = require('body-parser');

const app = express();

app.use(Cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

module.exports = app;
