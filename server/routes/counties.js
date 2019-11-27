const express = require('express');
const countiesControllers = require('../controllers/counties');

const router = express.Router();

router.get('/counties', countiesControllers.getCounties);

module.exports = router;
