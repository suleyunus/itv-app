const express = require('express');
const controllers = require('../controllers/groups');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validator');
const scheme = require('../util/schemas/groups');

const router = express.Router();

router.post('/groups', auth.verifyToken, validate(scheme.createGroupSchema, 'body'), controllers.createGroup);
router.get('/groups', auth.verifyToken, controllers.listAllGroups);
router.get('/groups/:groupId', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, controllers.getGroupById);
router.patch('/groups/:groupId', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, auth.verifyGroupAdmin, controllers.updateGroupById);
router.delete('/groups/:groupId', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, auth.verifyGroupAdmin, controllers.deleteGroupById);
router.post('/groups/:groupId/members', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, controllers.joinGroup);
router.get('/groups/:groupId/members', validate(scheme.getGroupByIdSchema, 'params'), auth.verifyToken, auth.verifyGroupMember, controllers.listMembersInGroup);
router.get('/groups/:groupId/members/:memberId', validate(scheme.getMemberById, 'params'), auth.verifyToken, auth.verifyGroupMember, controllers.getMemberInGroup);
// router.update('/group/:groupId/member/:memberId', auth.verifyToken);
router.delete('/groups/:groupId/members/:memberId', validate(scheme.getMemberById, 'params'), auth.verifyToken, auth.verifyOwnerOrAdmin, controllers.deleteMemberInGroup);

module.exports = router;
