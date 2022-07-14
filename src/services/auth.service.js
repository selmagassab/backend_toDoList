const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const User = require('../models/user.model');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { errors } = require('../utils/errors.constant');

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, errors.EMAIL_OR_PASSWORD_INCORRECT);
  }
  // if (!user.status.confirmed) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Email not verified');
  // }
  return user;
};

/**
 * Login with username and password
 * @param {string} userName
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithUserNameAndPassword = async (userName, password) => {
  const user = await userService.getUserByUserName(userName);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, errors.USERNAME_OR_PASSWORD_INCORRECT);
  }
  // if (!user.status.confirmed) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Email not verified');
  // }
  return user;
};

/**
 * Login with Facebook
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithFacebook = async (body) => {
  const { email, facebookId } = body;
  if (!email || !facebookId) throw new ApiError(httpStatus.UNAUTHORIZED, errors.EMAIL_OR_FACEBOOK_ID_REQUIRED);
  const facebookUser = await User.findOne({ facebookId });
  if (!facebookUser) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      const newUser = await userService.createUser(body);
      return newUser;
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, errors.EMAIL_ALREADY_USED);
  }
  return facebookUser;
};

/**
 * Login with google
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginwithgoogle = async (body) => {
  const { email, googleId } = body;
  if (!email || !googleId) throw new ApiError(httpStatus.UNAUTHORIZED, errors.EMAIL_OR_GOOGLE_ID_REQUIRED);
  const googleUser = await User.findOne({ googleId });
  if (!googleUser) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      const newUser = await userService.createUser(body);
      return newUser;
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, errors.EMAIL_ALREADY_USED);
  }
  return googleUser;
};
/**
 * Logout
 * @param {string} accessToken
 * @returns {Promise}
 */
const logout = async (accessToken) => {
  const accessTokenDoc = await Token.findOne({ token: accessToken, type: tokenTypes.ACCESS, blacklisted: false });
  if (!accessTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, errors.TOKEN_NOT_FOUND);
  }
  await accessTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.MUST_AUTHENTICATE);
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, errors.PASSWORD_RESET_FAILED);
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const verifemailToken = async (token) => {
  try {
    const verifyToken = await tokenService.verifyToken(token, tokenTypes.VERIF_EMAIL);
    const user = await userService.getUserById(verifyToken.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIF_EMAIL });
    user.status.confirmed = true;
    await user.save();
  } catch (error) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'Email already verified');
    return true;
  }
};
module.exports = {
  loginUserWithEmailAndPassword,
  loginWithFacebook,
  loginwithgoogle,
  logout,
  refreshAuth,
  resetPassword,
  verifemailToken,
  loginUserWithUserNameAndPassword,
};
