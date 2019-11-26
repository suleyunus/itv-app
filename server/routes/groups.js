const express = require('express');
const controllers = require('../controllers/groups');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/groups', auth.verifyToken, controllers.createGroup);
router.get('/groups', auth.verifyToken, controllers.listAllGroups);
router.get('/group/:groupId', auth.verifyToken, controllers.getGroupById);
router.patch('/group/:groupId', auth.verifyToken, controllers.updateGroupById);
router.delete('/group/:groupId', auth.verifyToken, controllers.deleteGroupById);
router.post('/group/:groupId/members', auth.verifyToken, controllers.joinGroup);
router.get('/group/:groupId/members', auth.verifyToken, controllers.listMembersInGroup);
router.get('/group/:groupId/member/:memberId', auth.verifyToken, controllers.getMemberInGroup);
// router.update('/group/:groupId/member/:memberId', auth.verifyToken);
router.delete('/group/:groupId/member/:memberId', auth.verifyToken, controllers.deleteMemberInGroup);

module.exports = router;
