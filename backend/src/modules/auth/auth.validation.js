const Joi = require('joi');
const { ROLES_LIST } = require('../../config/constants');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
  firstName: Joi.string().min(1).max(60).required(),
  lastName: Joi.string().min(1).max(60).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{1,4}\d{6,14}$/)
    .required()
    .messages({ 'string.pattern.base': 'Phone number must contain country code parameters' }),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(...ROLES_LIST)
    .required()
    .messages({ 'any.only': 'Role selection must match specified platform scopes' }),
  country: Joi.string().min(2).required(),
  additionalInformation: Joi.string().allow('').max(1000),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema };
