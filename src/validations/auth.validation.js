const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    phoneNumber: Joi.number().required(),
    redirectUrl: Joi.string().required(),
    type: Joi.string(),
  }),
};

const authfacebook = {
  email: Joi.string().email().lowercase().required(),
  facebookId: Joi.string().required().when('email', { is: null, then: Joi.required() }), // Either email or facebookId is required
};

const authgoogle = {
  email: Joi.string().email().lowercase().required(),
  googleId: Joi.string().required().when('email', { is: null, then: Joi.required() }), // Either email or googleId is required
};

const login = {
  body: Joi.object().keys({
    userName: Joi.string().lowercase().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    accessToken: Joi.string().required(),
  }),
};

const verifyEmail = {
  params: Joi.object().keys({
    // token: Joi.string().token().required(),
    token: Joi.string(),
    redirectUrl: Joi.string(),
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
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  authfacebook,
  authgoogle,
};
