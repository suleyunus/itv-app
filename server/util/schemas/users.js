const Joi = require('@hapi/joi');

exports.creatorSignUpSchema = Joi.object({
  firstName: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, firstName must be a string',
      'string.empty': 'firstName cannot be empty',
      'any.required': 'firstName is a required field',
      'string.trim': 'firstName must not have leading or trailing whitespace',
    }),
  lastName: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, lastName must be a string',
      'string.empty': 'lastName cannot be empty',
      'any.required': 'lastName is a required field',
      'string.trim': 'lastName must not have leading or trailing whitespace',
    }),
  stageName: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, stageName must be a string',
      'string.empty': 'stageName cannot be empty',
      'any.required': 'stageName is a required field',
      'string.trim': 'stageName must not have leading or trailing whitespace',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Invalid email',
      'string.empty': 'email cannot be empty',
      'any.required': 'email is a required field',
    }),
  phone: Joi.string()
    .strict()
    .required()
    .messages({
      'string.base': 'Invalid type, phone must be a string',
      'string.empty': 'phone cannot be empty',
      'any.required': 'phone is a required field',
      'string.trim': 'phone must not have leading or trailing whitespace',
    }),
  password: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, password must be a string',
      'string.empty': 'password cannot be empty',
      'any.required': 'password is a required field',
      'string.trim': 'password must not have leading or trailing whitespace',
    }),
  urbanCenter: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, urbanCenter must be an integer',
      'number.empty': 'urbanCenter cannot be empty',
      'any.required': 'urbanCenter is a required field',
    }),
  majorSkill: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, majorSkill must be an integer',
      'number.empty': 'majorSkill cannot be empty',
      'any.required': 'majorSkill is a required field',
    }),
  minorSkill: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, minorSkill must be an integer',
      'number.empty': 'minorSkill cannot be empty',
      'any.required': 'minorSkill is a required field',
    }),
  agreeToLicense: Joi.boolean()
    .required()
    .valid(true)
    .messages({
      'boolean.base': 'Invalid type, agreeToLicense must be an integer',
      'boolean.empty': 'agreeToLicense cannot be empty',
      'boolean.only': 'You must agree to the creator license',
      'any.required': 'agreeToLicense is a required field',
    }),
});

exports.loginSchema = Joi.object({
  username: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, username should be a string',
      'string.empty': 'username cannot be empty',
      'any.required': 'username is a required field',
      'string.trim': 'username must not have leading or trailing whitespace',
    }),
  password: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, password should be a string',
      'string.empty': 'password cannot be empty',
      'any.required': 'password is a required field',
      'string.trim': 'password must not have leading or trailing whitespace',
    }),
});

exports.resetPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Invalid email address',
      'string.empty': 'email cannot be empty',
      'any.required': 'email is a required field',
    }),
});

exports.passwordResetDoneSchema = Joi.object({
  id: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, id must be an integer',
      'number.empty': 'id cannot be emptpy',
      'any.required': 'id is a required field',
    }),
  token: Joi.string()
    .strict()
    .trim()
    .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid token',
      'string.empty': 'token cannot be empty',
      'any.required': 'token is a required field',
      'string.trim': 'token must not have leading or trailing whitespace',
    }),
  password: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, password must be a string',
      'string.empty': 'password cannot be empty',
      'any.required': 'password is a required field',
      'string.trim': 'password must not have leading or trailing whitespace',
    }),
  confirmPassword: Joi.string()
    .required()
    .messages({
      'string.base': 'Invalid type, confirmPassword must be a string',
      'string.empty': 'confirmPassword cannot be empty',
      'any.required': 'confirmPassword is a required field',
      'string.trim': 'ConfirmPassword must not have leading or trailing whitespace',
    }),
});

exports.changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, newPassword must be a string',
      'string.empty': 'newPassword cannot be empty',
      'any.required': 'newPassword is a required field',
      'string.trim': 'newPassword must not have leading or trailing whitespace',
    }),
  oldPassword: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, oldPassword must be a string',
      'string.empty': 'oldPassword cannot be empty',
      'any.required': 'OldPassword is a required field',
      'string.trim': 'OldPassword must not have leading or trailing whitespace',
    }),
});

exports.getUserSchema = Joi.object({
  userId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, userId must be an integer',
      'number.empty': 'userId cannot be empty',
      'any.required': 'userId is a required field',
    }),
});

exports.updateCreatorProfileSchema = Joi.object({
  firstName: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, firstName must be a string',
      'string.empty': 'firstName cannot be empty',
      'string.trim': 'firstName must not have leading or trailing whitespace',
    }),
  lastName: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, lastName must be a string',
      'string.empty': 'lastName cannot be empty',
      'string.trim': 'lastName must not have leading or trailing whitespace',
    }),
  stageName: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, stageName must be a string',
      'string.empty': 'stageName cannot be empty',
      'string.trim': 'stageName must not have leading or trailing whitespace',
    }),
  bio: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, bio must be a string',
      'string.empty': 'bio cannot be empty',
      'string.trim': 'bio must not have leading or trailing whitespace',
    }),
  urbanCenter: Joi.number()
    .integer()
    .messages({
      'number.base': 'Invalid type, urbanCenter must be an integer',
      'number.empty': 'urbanCenter cannot be empty',
    }),
  majorSkill: Joi.number()
    .integer()
    .messages({
      'number.base': 'Invalid type, majorSkill must be an integer',
      'number.empty': 'majorSkill cannot be empty',
    }),
  minorSkill: Joi.number()
    .integer()
    .messages({
      'number.base': 'Invalid type, minorSkill must be an integer',
      'number.empty': 'minorSkill cannot be empty',
    }),
});
