const Joi = require('@hapi/joi');

exports.creatorSignUpSchema = Joi.object({
  firstName: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, first name must be a string',
      'string.empty': 'Please enter your first name',
      'any.required': 'First Name is a required field',
      'string.trim': 'First Name must not have leading or trailing whitespace',
    }),
  lastName: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, last name must be a string',
      'string.empty': 'Please enter your last name',
      'any.required': 'Last Name is a required field',
      'string.trim': 'Last Name must not have leading or trailing whitespace',
    }),
  stageName: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, stage name must be a string',
      'string.empty': 'Please enter your stage name',
      'any.required': 'Stage Name is a required field',
      'string.trim': 'Stage Name must not have leading or trailing whitespace',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Invalid email address',
      'string.empty': 'Please enter your email address',
      'any.required': 'Email is a required field',
    }),
  phone: Joi.string()
    .strict()
    .required()
    .messages({
      'string.base': 'Invalid type, phone number must be a string',
      'string.empty': 'Please enter your phone number',
      'any.required': 'Phone is a required field',
      'string.trim': 'Phone must not have leading or trailing whitespace',
    }),
  password: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, password must be a string',
      'string.empty': 'Please enter your password',
      'any.required': 'Password is a required field',
      'string.trim': 'Password must not have leading or trailing whitespace',
    }),
  urbanCenter: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, urban center must be an integer',
      'number.empty': 'Urban Center is required',
      'any.required': 'Urban Center is a required field',
    }),
  majorSkill: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, major skill must be an integer',
      'number.empty': 'Please provide your major skill',
      'any.required': 'Major Skill is a required field',
    }),
  minorSkill: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, minor skill must be an integer',
      'number.empty': 'Please provide your minor skill',
      'any.required': 'Minor Skill is a required field',
    }),
  agreeToLicense: Joi.boolean()
    .required()
    .valid(true)
    .messages({
      'boolean.base': 'Invalid type, agree to license must be an integer',
      'boolean.empty': 'Agree to license is required',
      'boolean.only': 'You must agree to the creator license',
      'any.required': 'Agree to license is a required field',
    }),
});

exports.loginSchema = Joi.object({
  username: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, username should be a string',
      'string.empty': 'Please provide your email or phone number to login',
      'any.required': 'Username is a required field',
      'string.trim': 'Username must not have leading or trailing whitespace',
    }),
  password: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, password should be a string',
      'string.empty': 'Please provide your password to login',
      'any.required': 'Password is a required field',
      'string.trim': 'Password must not have leading or trailing whitespace',
    }),
});

exports.resetPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Invalid email address',
      'string.empty': 'Please enter your email address',
      'any.required': 'Email is a required field',
    }),
});

exports.passwordResetDoneSchema = Joi.object({
  id: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, id must be an integer',
      'number.empty': 'id is required',
      'any.required': 'id is a required field',
    }),
  token: Joi.string()
    .strict()
    .trim()
    .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid token',
      'string.empty': 'Please provide a token',
      'any.required': 'Token is a required field',
      'string.trim': 'Token must not have leading or trailing whitespace',
    }),
  password: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, password must be a string',
      'string.empty': 'Please provide your password',
      'any.required': 'Password is a required field',
      'string.trim': 'Password must not have leading or trailing whitespace',
    }),
  confirmPassword: Joi.string()
    .required()
    .messages({
      'string.base': 'Invalid type, confirmPassword must be a string',
      'string.empty': 'Please confirm your password',
      'any.required': 'Password confirmation is a required field',
      'string.trim': 'Confirm Password must not have leading or trailing whitespace',
    }),
});

exports.changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, newPassword must be a string',
      'string.empty': 'Please provide your new password',
      'any.required': 'New password is a required field',
      'string.trim': 'New password must not have leading or trailing whitespace',
    }),
  oldPassword: Joi.string()
    .strict()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid type, oldPassword must be a string',
      'string.empty': 'Please provide your old password',
      'any.required': 'Old password is a required field',
      'string.trim': 'Old password must not have leading or trailing whitespace',
    }),
});

exports.getUserSchema = Joi.object({
  userId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Invalid type, userId must be an integer',
      'number.empty': 'userId is required',
      'any.required': 'userId is a required field',
    }),
});

exports.updateCreatorProfileSchema = Joi.object({
  firstName: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, first name must be a string',
      'string.empty': 'Please enter your first name',
      'string.trim': 'First Name must not have leading or trailing whitespace',
    }),
  lastName: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, last name must be a string',
      'string.empty': 'Please enter your last name',
      'string.trim': 'Last Name must not have leading or trailing whitespace',
    }),
  stageName: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, stage name must be a string',
      'string.empty': 'Please enter your stage name',
      'string.trim': 'Stage Name must not have leading or trailing whitespace',
    }),
  bio: Joi.string()
    .strict()
    .trim()
    .messages({
      'string.base': 'Invalid type, stage name must be a string',
      'string.empty': 'Please enter your bio',
      'string.trim': 'Bio must not have leading or trailing whitespace',
    }),
  urbanCenter: Joi.number()
    .integer()
    .messages({
      'number.base': 'Invalid type, urban center must be an integer',
      'number.empty': 'Urban Center is required',
    }),
  majorSkill: Joi.number()
    .integer()
    .messages({
      'number.base': 'Invalid type, major skill must be an integer',
      'number.empty': 'Please provide your major skill',
    }),
  minorSkill: Joi.number()
    .integer()
    .messages({
      'number.base': 'Invalid type, minor skill must be an integer',
      'number.empty': 'Please provide your minor skill',
    }),
});
