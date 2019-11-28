const Sequelize = require('sequelize');
const model = require('../models');
const asyncMiddleware = require('../middlewares/async');
const Response = require('../util/response');

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
        required: false,
        through: {
          attributes: [],
        },
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
      groupAvatar: req.body.groupAvatar || group.groupAvatar,
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

  const data = await Group
    .findAll({
      where: {
        id: groupId,
      },
      attributes: [],
      include: [{
        model: User,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'bio',
          'avatarUrl',
        ],
        as: 'members',
      }],
    });

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

  const data = await Group
    .findAll({
      where: {
        id: groupId,
      },
      attributes: [],
      include: [{
        model: User,
        where: {
          id: memberId,
        },
        attributes: [
          'id',
          'firstName',
          'lastName',
          'bio',
          'avatarUrl',
        ],
        as: 'members',
      }],
    });

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
