const express = require('express');
const controllers = require('../controllers/users');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.post('/auth/creators/signup', controllers.creatorSignup);
router.post('/auth/login', controllers.login);
router.post('/auth/password/reset', controllers.passwordReset);
router.post('/auth/password/reset/done', controllers.passwordResetConfirm);
router.post('/auth/password/change', Auth.verifyToken, controllers.changePassword);

module.exports = router;
