const httpStatus = require('http-status');

// const { isEmpty, isArray } = require('lodash');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const { errors } = require('../utils/errors.constant');
const { userService } = require('../services');
const { roles } = require('../config/roles');
const { io } = require('../socket');
const ApiError = require('../utils/ApiError');
// const { userNameCin } = require('../utils/searchPatterns');

const publishEventToSecretary = async (user, payload, requestName) => {
  try {
    const officeStaff = await userService.getUsersByOffice(user.office);
    const connectedUser = officeStaff.filter((el) => el.isConnected && el.id !== user.id && el.role === 'secretary');

    connectedUser.forEach((conUser) => {
      io.to(conUser.lastSocketId).emit('message', {
        request: requestName,
        payload,
      });
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, errors.INTERNAL_SERVER_ERROR);
  }
};

const createUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser({ ...req.body });
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const createAdmin = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser({ ...req.body, role: roles[3] });
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});
const userdata = catchAsync(async (req, res) => {
  try {
    const user = await userService.getUserById(req.user._id);
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const userInfoByAdmin = catchAsync(async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const getUsers = catchAsync(async (req, res) => {
  try {
    // const filter = pick(req.query, ['search', 'role']);
    // const { search, role } = filter;
    // const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers();
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const deleteUser = catchAsync(async (req, res) => {
  try {
    const deletedUser = await userService.deleteUserById(req.params.id);
    res.status(httpStatus.OK).send(deletedUser);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const updateUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const updateUserStatus = catchAsync(async (req, res) => {
  try {
    const user = await userService.updateUserStatus(req.params.id, req.body);
    await publishEventToSecretary(user, user, 'PUBLISHING_DOCTOR_AVAIBILITY');
    res.send(user.status);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

module.exports = {
  createAdmin,
  createUser,
  userdata,
  getUsers,
  deleteUser,
  userInfoByAdmin,
  updateUser,
  updateUserStatus,
  publishEventToSecretary,
};
