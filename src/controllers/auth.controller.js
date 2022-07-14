const httpStatus = require('http-status');
// const generator = require('generate-password');
// const { host, webHost } = require('../utils/hostdetection');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
// const verifEmailTemplate = require('../utils/emailTemplate/verifivationEmail');
const resetPasswordTemplate = require('../utils/emailTemplate/resetPasswordTemplate');

const { authService, userService, tokenService, emailService } = require('../services');
const { errors } = require('../utils/errors.constant');

// const register = catchAsync(async (req, res) => {
//   try {
//     const user = await userService.createUser(req.body);
//     const token = await tokenService.generateVerifEmailToken(user);
//     const redirectUrl = req.body.redirectUrl || 'cargate';
//     await emailService.sendEmail(
//       user.email,
//       'Verification Email',
//       null,
//       verifEmailTemplate(`${host}/v1/auth/verifemail/${token}/${redirectUrl}`)
//     );
//     const tokens = await tokenService.generateAuthTokens(user);
//     res.status(httpStatus.CREATED).send({ tokens, msg: errors.VERIFICATION_EMAIL_SENT });
//   } catch (error) {
//     res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
//       message: error.message,
//       error,
//     });
//   }
// });

// const requestVerifEmail = catchAsync(async (req, res) => {
//   try {
//     const user = await userService.getUserById(req.user._id);
//     if (user.status.confirmed) res.status(httpStatus.BAD_REQUEST).send({ msg: errors.EMAIL_ALREADY_VERIFIED });
//     const token = await tokenService.generateVerifEmailToken(user);
//     await emailService.sendEmail(
//       user.email,
//       'Verification Email',
//       null,
//       verifEmailTemplate(`${host}/v1/auth/verifemail/${token}/dashboard`)
//     );

//     res.status(httpStatus.OK).send({ msg: errors.VERIFICATION_EMAIL_SENT });
//   } catch (error) {
//     res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
//       message: error.message,
//       error,
//     });
//   }
// });

const login = catchAsync(async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await authService.loginUserWithUserNameAndPassword(userName, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ tokens });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

// const verifemail = catchAsync(async (req, res) => {
//   try {
//     const { token, redirectUrl = '' } = req.params;
//     await authService.verifemailToken(token);
//     res.redirect(`${webHost}/${redirectUrl}`);
//   } catch (error) {
//     res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
//       message: error.message,
//       error,
//     });
//   }
// });

// const loginWithFacebook = catchAsync(async (req, res) => {
//   try {
//     const user = await authService.loginWithFacebook(req.body);
//     const tokens = await tokenService.generateAuthTokens(user);
//     res.send({ user, tokens });
//   } catch (error) {
//     res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
//       message: error.message,
//       error,
//     });
//   }
// });

// const loginwithgoogle = catchAsync(async (req, res) => {
//   try {
//     const user = await authService.loginwithgoogle(req.body);
//     const tokens = await tokenService.generateAuthTokens(user);
//     res.send({ user, tokens });
//   } catch (error) {
//     res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
//       message: error.message,
//       error,
//     });
//   }
// });

const logout = catchAsync(async (req, res) => {
  try {
    await authService.logout(req.body.accessToken);
    res.status(httpStatus.OK).send({ msg: errors.SUCCESSFULLY_DISCONNECTED });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const refreshTokens = catchAsync(async (req, res) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const forgotPassword = catchAsync(async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, errors.EMAIL_WITH_NO_CORRESPONDENCE);
    const password = 'admin1234';
    // const password = generator.generate({
    //   length: 10,
    //   numbers: true,
    // });
    user.password = password;
    user.save();
    await emailService.sendEmail(user.email, errors.PASSWORD_RESET, null, resetPasswordTemplate(req.body.email, password));
    res.status(httpStatus.OK).send({ msg: errors.NEW_PASSWORD_SENT_TO_MAIL });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const resetPassword = catchAsync(async (req, res) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

module.exports = {
  // register,
  login,
  // verifemail,
  // loginWithFacebook,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  // loginwithgoogle,
  // requestVerifEmail,
};
