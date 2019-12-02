const Joi = require('@hapi/joi');

exports.createGroupSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Invalid type, name must be a string',
      'string.empty': 'Please provide a group name',
      'any.required': 'Name is a required field',
    }),
});

exports.getGroupByIdSchema = Joi.object({
  groupId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, groupId must be an integer',
      'number.empty': 'groupId is required',
      'any.required': 'groupId is a required field',
    }),
});

exports.getMemberById = Joi.object({
  groupId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, groupId must be an integer',
      'number.empty': 'groupId is required',
      'any.required': 'groupId is a required field',
    }),
  memberId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, memberId must be an integer',
      'number.empty': 'memberId is required',
      'any.required': 'memberId is a required field',
    }),
});
