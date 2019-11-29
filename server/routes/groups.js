const express = require('express');
const controllers = require('../controllers/groups');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/groups', auth.verifyToken, controllers.createGroup);
router.get('/groups', auth.verifyToken, controllers.listAllGroups);
router.get('/groups/:groupId', auth.verifyToken, controllers.getGroupById);
router.patch('/groups/:groupId', auth.verifyToken, controllers.updateGroupById);
router.delete('/groups/:groupId', auth.verifyToken, controllers.deleteGroupById);
router.post('/groups/:groupId/members', auth.verifyToken, controllers.joinGroup);
router.get('/groups/:groupId/members', auth.verifyToken, controllers.listMembersInGroup);
router.get('/groups/:groupId/members/:memberId', auth.verifyToken, controllers.getMemberInGroup);
// router.update('/group/:groupId/member/:memberId', auth.verifyToken);
router.delete('/groups/:groupId/members/:memberId', auth.verifyToken, controllers.deleteMemberInGroup);

module.exports = router;
