const express = require('express');
const controllers = require('../controllers/groups');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validator');
const scheme = require('../util/schemas/groups');
const multerUploads = require('../middlewares/multer');

const router = express.Router();

router.post('/groups', auth.verifyToken, validate(scheme.createGroupSchema, 'body'), controllers.createGroup);
router.get('/groups', auth.verifyToken, controllers.listAllGroups);
router.get('/groups/:groupId', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, controllers.getGroupById);
router.patch('/groups/:groupId', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, auth.verifyGroupAdmin, validate(scheme.updateGroupSchema, 'body'), controllers.updateGroupById);
router.patch('/groups/:groupId/avatars', auth.verifyToken, auth.verifyGroupAdmin, multerUploads.multerUploads, controllers.updateGroupAvatar);
router.delete('/groups/:groupId/avatars', auth.verifyToken, auth.verifyGroupAdmin, controllers.deleteGroupAvatar);
router.delete('/groups/:groupId', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, auth.verifyGroupAdmin, controllers.deleteGroupById);
router.post('/groups/:groupId/members', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, controllers.joinGroup);
router.get('/groups/:groupId/members', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, auth.verifyGroupMember, controllers.listMembersInGroup);
router.get('/groups/:groupId/members/:memberId', validate(scheme.getMemberById, 'params'), auth.verifyToken, auth.verifyGroupMember, controllers.getMemberInGroup);
router.patch('/groups/:groupId/members/:memberId', auth.verifyToken, auth.verifyGroupAdmin, validate(scheme.assignAdminPrivilegesSchema, 'body'), controllers.makeMemberAdminInGroup);
router.delete('/groups/:groupId/members/:memberId', validate(scheme.getMemberById, 'params'), auth.verifyToken, auth.verifyOwnerOrAdmin, controllers.deleteMemberInGroup);
router.get('/creators/:userId/groups', auth.verifyToken, auth.verifyOwner, controllers.getGroupMembershipsForUser);

module.exports = router;
