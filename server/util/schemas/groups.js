const Joi = require('@hapi/joi');

exports.createGroupSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Invalid type, name must be a string',
      'string.empty': 'Name cannot be empty',
      'any.required': 'Name is a required field',
    }),
});

exports.getGroupByIdSchema = Joi.object({
  groupId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, groupId must be an integer',
      'number.empty': 'groupId cannot be empty',
      'any.required': 'groupId is a required field',
    }),
});

exports.getMemberById = Joi.object({
  groupId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, groupId must be an integer',
      'number.empty': 'groupId cannot be empty',
      'any.required': 'groupId is a required field',
    }),
  memberId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, memberId must be an integer',
      'number.empty': 'memberId cannot be empty',
      'any.required': 'memberId is a required field',
    }),
});

exports.updateGroupSchema = Joi.object({
  name: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, name must be a string',
      'string.empty': 'name cannot be empty',
      'string.trim': 'Name must not have leading or trailing whitespace',
    }),
  bio: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, bio must be a string',
      'string.empty': 'bio cannot be empty',
      'string.trim': 'Name must not have leading or trailing whitespace',
    }),
});

exports.assignAdminPrivilegesSchema = Joi.object({
  groupAdmin: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'Invalid type, groupAdmin must be a boolean',
      'boolean.empty': 'groupAdmin cannot be empty',
      'any.required': 'groupAdmin is a required field',
    }),
});
