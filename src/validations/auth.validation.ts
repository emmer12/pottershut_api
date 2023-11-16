import * as Joi from "joi";
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    first_name: Joi.string().max(35).required(),
    last_name: Joi.string().max(35).required(),
    middle_name: Joi.string().max(35).empty(),
    password: Joi.string().min(3).max(15).required().label('Password'),
    password_confirmation: Joi.any().equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
    email: Joi.string().required().email(),
    // user_type: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    code: Joi.string().length(4).required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const otp = {
  body: Joi.object().keys({
    verification_key: Joi.string().required(),
    check: Joi.string().required(),
    otp: Joi.number().required(),
  }),
};

const resend = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

export {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  otp,
  resend,
};
