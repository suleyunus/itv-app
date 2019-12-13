const Sequelize = require('sequelize');
const model = require('../models');
const asyncMiddleware = require('../middlewares/async');
const Response = require('../util/response');
const { uploader } = require('../config/cloudinaryConfig');
const { dataUri } = require('../middlewares/multer');

const { Op } = Sequelize;

const { Group, GroupMember, User } = model;

/**
 * Create a new group
 */

exports.createGroup = asyncMiddleware(async (req, res) => {
  const {
    name,
    about,
    groupAvatar,
  } = req.body;

  const newGroup = await Group
    .create({
      name,
      about,
      groupAvatar,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });

  // eslint-disable-next-line no-unused-vars
  const addMember = await GroupMember
    .create({
      groupId: newGroup.id,
      userId: req.user.id,
      groupAdmin: true,
    });

  const data = await Group
    .findAll({
      where: {
        id: newGroup.id,
      },
      include: [{
        model: User,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'bio',
          'avatarUrl',
          'lastLogin',
        ],
        as: 'members',
      }],
    });

  return Response.HTTP_201_CREATED('Group created successfully', data, res);
});

/**
 * List all groups
 */

exports.listAllGroups = asyncMiddleware(async (req, res) => {
  const data = await Group
    .findAll();

  return Response.HTTP_200_OK(data, res);
});


/**
 * Get group by Id
 */

exports.getGroupById = asyncMiddleware(async (req, res) => {
  const data = await Group
    .findAll({
      where: {
        id: req.params.groupId,
      },
      include: [{
        model: User,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'bio',
          'avatarUrl',
          'lastLogin',
        ],
        as: 'members',
      }],
    });

  return Response.HTTP_200_OK(data, res);
});

/**
 * Update a group by Id
 */

exports.updateGroupById = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const group = await Group
    .findByPk(groupId);

  if (!group) {
    return Response.HTTP_404_NOT_FOUND(`Group with Id: ${groupId} does not exist`, res);
  }

  const updatedGroup = await group
    .update({
      name: req.body.name || group.name,
      about: req.body.about || group.about,
    });

  return res.status(200).send({
    status: 'Success',
    message: 'Group updated successfully',
    data: updatedGroup,
  });
});


/**
 * Delete group by Id
 */

exports.deleteGroupById = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const group = await Group
    .findByPk(groupId);

  if (!group) {
    return Response.HTTP_404_NOT_FOUND(`Group with Id: ${groupId} does not exist`, res);
  }

  // eslint-disable-next-line no-unused-vars
  const deletedGroup = await group
    .destroy();

  return res.status(200).send({
    status: 'Success',
    message: 'Group deleted successfully',
  });
});


/**
 * Join group
 */

exports.joinGroup = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const group = await Group
    .findByPk(groupId);

  if (!group) {
    return Response.HTTP_404_NOT_FOUND(`Group with Id: ${groupId} does not exist`, res);
  }

  const existingMember = await GroupMember
    .findAll({
      where: {
        [Op.and]: [{ userId: req.user.id }, { groupId }],
      },
    });

  if (existingMember.length !== 0) {
    return Response.HTTP_400_BAD_REQUEST('Member already exists in the group', res);
  }

  const addMember = await GroupMember
    .create({
      groupId: req.params.groupId,
      userId: req.user.id,
      groupAdmin: false,
    });

  return Response.HTTP_201_CREATED('Member joined successfully', addMember, res);
});


/**
 * List all members in a group
 */

exports.listMembersInGroup = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const group = await Group
    .findByPk(groupId);

  if (!group) {
    return Response.HTTP_404_NOT_FOUND(`Group with Id: ${groupId} does not exist`, res);
  }

  const data = await model.sequelize.query(
    `SELECT 
    "u"."id",
    "u"."firstName",
    "u"."lastName",
    "u"."bio",
    "u"."avatarUrl",
    "u"."lastLogin",
    "m"."groupAdmin",
    "m"."createdAt",
    "m"."updatedAt"
FROM
    "Users" u,
    "GroupMembers" m,
    "Groups" g
WHERE
    "m"."userId" = "u"."id"
    AND "m"."groupId" = "g"."id"
    AND "m"."groupId" = ${groupId};`,
    {
      type: model.sequelize.QueryTypes.SELECT,
    },
  );

  return Response.HTTP_200_OK(data, res);
});


/**
 * Get member in group with Id
 */

exports.getMemberInGroup = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const memberId = parseInt(req.params.memberId, 10);
  const group = await Group
    .findByPk(groupId);

  if (!group) {
    return Response.HTTP_404_NOT_FOUND(`Group with Id: ${groupId} does not exist`, res);
  }

  const member = await GroupMember
    .findAll({
      where: {
        [Op.and]: [{ groupId }, { userId: memberId }],
      },
    });

  if (member.length === 0) {
    return Response.HTTP_404_NOT_FOUND(`Member with Id: ${memberId} does not exist`, res);
  }

  const data = await model.sequelize.query(
    `SELECT 
    "u"."id",
    "u"."firstName",
    "u"."lastName",
    "u"."bio",
    "u"."avatarUrl",
    "u"."lastLogin",
    "m"."groupAdmin",
    "m"."createdAt",
    "m"."updatedAt"
FROM
    "Users" u,
    "GroupMembers" m,
    "Groups" g
WHERE
    "m"."userId" = "u"."id"
    AND "m"."groupId" = "g"."id"
    AND "m"."groupId" = ${groupId}
    AND "m"."userId" = ${memberId}
    ;`,
    {
      type: model.sequelize.QueryTypes.SELECT,
    },
  );

  return Response.HTTP_200_OK(data, res);
});


/**
 * Delete member in group with id
 */

exports.deleteMemberInGroup = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const userId = parseInt(req.params.memberId, 10);
  const group = await Group
    .findByPk(groupId);

  if (!group) {
    return Response.HTTP_404_NOT_FOUND(`Group with Id: ${groupId} does not exist`, res);
  }

  const member = await GroupMember
    .findAll({
      where: {
        [Op.and]: [{ groupId }, { userId }],
      },
    });

  if (member.length === 0) {
    return Response.HTTP_404_NOT_FOUND(`Member with Id: ${userId} does not exist`, res);
  }

  // eslint-disable-next-line no-unused-vars
  const deleteMember = await GroupMember
    .destroy({
      where: {
        [Op.and]: [{ groupId }, { userId }],
      },
    });

  return res.status(200).send({
    status: 'Success',
    message: 'Member deleted successfully',
  });
});


/**
 * Assign or revoke admin privileges to member in group with id
 */

exports.makeMemberAdminInGroup = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const userId = parseInt(req.params.memberId, 10);
  const group = await Group
    .findByPk(groupId);

  if (!group) {
    return Response.HTTP_404_NOT_FOUND(`Group with Id: ${groupId} does not exist`, res);
  }

  const member = await GroupMember
    .findOne({
      where: {
        [Op.and]: [{ groupId }, { userId }],
      },
    });

  if (!member) {
    return Response.HTTP_404_NOT_FOUND(`Member with Id: ${userId} does not exist`, res);
  }

  // eslint-disable-next-line no-unused-vars
  const updateMember = await member
    .update({
      groupAdmin: req.body.groupAdmin || member.groupAdmin,
    });

  const data = await model.sequelize.query(
    `SELECT 
      "u"."id",
      "u"."firstName",
      "u"."lastName",
      "u"."bio",
      "u"."avatarUrl",
      "u"."lastLogin",
      "m"."groupAdmin",
      "m"."createdAt",
      "m"."updatedAt"
  FROM
      "Users" u,
      "GroupMembers" m,
      "Groups" g
  WHERE
      "m"."userId" = "u"."id"
      AND "m"."groupId" = "g"."id"
      AND "m"."groupId" = ${groupId}
      AND "m"."userId" = ${userId}
      ;`,
    {
      type: model.sequelize.QueryTypes.SELECT,
    },
  );

  return res.status(200).send({
    status: 'Success',
    message: 'Member permissions updated successfully',
    data,
  });
});


/**
 * Update group avatar
 */

exports.updateGroupAvatar = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const foundGroup = await Group
    .findOne({
      where: {
        id: groupId,
      },
    });

  if (!foundGroup) {
    return Response.HTTP_404_NOT_FOUND(`Group with id: ${groupId}`, res);
  }

  const avatar = req.file;
  const file = dataUri(avatar);

  const newAvatar = await uploader.upload(
    file,
    {
      use_filename: true,
      folder: 'avatars/groups',
    },
  );

  const {
    groupAvatar,
  } = foundGroup;

  if (groupAvatar) {
    const splitUrl = groupAvatar.split('/');
    // eslint-disable-next-line camelcase
    const public_id = `${splitUrl[7]}/${splitUrl[8]}/${splitUrl[9].split('.')[0]}`;
    // eslint-disable-next-line no-unused-vars
    const deleteAvatar = await uploader.destroy(public_id);
  }

  const updatedGroupProfile = await foundGroup
    .update({
      groupAvatar: newAvatar.url || groupAvatar,
    });

  const data = {
    groupId: updatedGroupProfile.id,
    avatarUrl: updatedGroupProfile.groupAvatar,
  };

  return res.status(200).send({
    status: 'Success',
    message: 'Avatar updated successfully',
    data,
  });
});

/**
 * Delete group avatar
 */

exports.deleteGroupAvatar = asyncMiddleware(async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const foundGroup = await Group
    . findOne({
      where: {
        id: groupId,
      },
    });

  if (!foundGroup) {
    return Response.HTTP_404_NOT_FOUND(`Group with id: ${groupId} not found`, res);
  }

  const {
    groupAvatar,
  } = foundGroup;

  if (!groupAvatar) {
    return Response.HTTP_404_NOT_FOUND('There is no image to delete', res);
  }

  const splitUrl = groupAvatar.split('/');
  // eslint-disable-next-line camelcase
  const public_id = `${splitUrl[7]}/${splitUrl[8]}/${splitUrl[9].split('.')[0]}`;
  // eslint-disable-next-line no-unused-vars
  const deleteAvatar = await uploader.destroy(public_id);

  // eslint-disable-next-line no-unused-vars
  const updatedGroup = await foundGroup
    .update({
      groupAvatar: null,
    });

  return Response.HTTP_200_OK('Avatar deleted successfully', res);
});

/**
 * Get group memberships for user
 */

exports.getGroupMembershipsForUser = asyncMiddleware(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const foundUser = await User
    .findOne({
      where: {
        id: userId,
      },
    });

  if (!foundUser) {
    return Response.HTTP_404_NOT_FOUND(`User with ID: ${userId} not found`, res);
  }

  const data = await model.sequelize.query(
    `SELECT 
      "g"."id",
      "g"."name",
      "g"."about",
      "g"."groupAvatar",
      "g"."createdAt",
      "g"."updatedAt"
  FROM
      "Users" u,
      "GroupMembers" m,
      "Groups" g
  WHERE
      "m"."userId" = "u"."id"
      AND "m"."groupId" = "g"."id"
      AND "m"."userId" = ${userId}
      ;`,
    {
      type: model.sequelize.QueryTypes.SELECT,
    },
  );

  return Response.HTTP_200_OK(data, res);
});
