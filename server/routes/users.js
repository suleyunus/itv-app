const express = require('express');
const controllers = require('../controllers/users');
const Auth = require('../middlewares/auth');
const Validator = require('../middlewares/validator');
const scheme = require('../util/schemas/users');
const multerUploads = require('../middlewares/multer');

const router = express.Router();

router.post('/auth/creators/signup', Validator(scheme.creatorSignUpSchema, 'body'), controllers.creatorSignup);
router.post('/auth/login', Validator(scheme.loginSchema, 'body'), controllers.login);
router.post('/auth/password/reset', Validator(scheme.resetPasswordSchema, 'body'), controllers.passwordReset);
router.post('/auth/password/reset/done', Validator(scheme.passwordResetDoneSchema, 'body'), controllers.passwordResetConfirm);
router.post('/auth/password/change', Auth.verifyToken, Validator(scheme.changePasswordSchema, 'body'), controllers.changePassword);
router.get('/users/:userId', Validator(scheme.getUserSchema, 'params'), Auth.verifyToken, controllers.getUserById);
router.patch('/users/:userId/avatars', Auth.verifyToken, Auth.verifyOwner, multerUploads.multerUploads, controllers.updateUserAvatar);
router.delete('/users/:userId/avatars', Auth.verifyToken, Auth.verifyOwner, controllers.deleteUserAvatar);
router.patch('/creators/:userId', Auth.verifyToken, Auth.verifyOwner, Validator(scheme.updateCreatorProfileSchema, 'body'), controllers.updateCreatorDetails);

module.exports = router;
