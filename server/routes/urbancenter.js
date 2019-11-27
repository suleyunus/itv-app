const express = require('express');
const urbanCenterController = require('../controllers/urbancenter');

const router = express.Router();

router.get('/urbancenters', urbanCenterController.getUrbanCenters);

module.exports = router;
