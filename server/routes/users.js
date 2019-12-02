const express = require('express');
const controllers = require('../controllers/users');
const Auth = require('../middlewares/auth');
const Validator = require('../middlewares/validator');
const scheme = require('../util/schemas/users');

const router = express.Router();

router.post('/auth/creators/signup', Validator(scheme.creatorSignUpSchema, 'body'), controllers.creatorSignup);
router.post('/auth/login', Validator(scheme.loginSchema, 'body'), controllers.login);
router.post('/auth/password/reset', Validator(scheme.resetPasswordSchema, 'body'), controllers.passwordReset);
router.post('/auth/password/reset/done', Validator(scheme.passwordResetDoneSchema, 'body'), controllers.passwordResetConfirm);
router.post('/auth/password/change', Validator(scheme.changePasswordSchema, 'body'), Auth.verifyToken, controllers.changePassword);
router.get('/users/:userId', Auth.verifyToken, Validator(scheme.getUserSchema, 'params'), controllers.getUserById);

module.exports = router;
