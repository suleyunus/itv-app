const express = require('express');
const controllers = require('../controllers/users');

const router = express.Router();

router.post('/auth/creators/signup', controllers.creatorSignup);
router.post('/auth/login', controllers.login);

module.exports = router;
