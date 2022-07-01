/* eslint-disable no-await-in-loop */
const httpStatus = require('http-status');
const { roles } = require('../config/roles');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { errors } = require('../utils/errors.constant');
const genUsername = require('../utils/genUsername');
const { populatePatientConsultation } = require('../utils/populationPatterns');
const { userNameCin } = require('../utils/searchPatterns');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  let exist = false;
  let userName;
  do {
    userName = genUsername(userBody.firstName, userBody.lastName);
    // eslint-disable-next-line no-await-in-loop
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    exist = await User.exists({ userName });
  } while (exist);

  const user = await User.create({ ...userBody, userName, password: userName });
  return user;
};

/**
 * Query for users

 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  const users = await User.find();
  return users;
};

const queryPatients = async (filter, options, select, populations) => {
  const users = await User.paginate(filter, options, select, populations);
  return users;
};

const getUsersByUserName = async (userName, officeSearch, roleSearch = [roles[0]]) => {
  if (officeSearch === '') {
    // eslint-disable-next-line no-param-reassign
    officeSearch = { $exists: true };
  }
  return User.find({
    $or: userNameCin(userName),
    role: { $in: roleSearch },
    office: officeSearch,
  }).select('id');
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, errors.USER_NOT_FOUND);
  }
  return user;
};

const getPatientById = async (id, populateArray) => {
  return User.findById(id).populate(populateArray);
};

const searchPatientByName = async (name, myoffice) => {
  return User.find({
    $or: userNameCin(name),
    role: roles[0],
    office: myoffice,
  }).select('id firstName lastName userName phoneNumber isConnected lastConnection');
};

const searchDoctorByName = async (name) => {
  return User.find({
    $or: userNameCin(name),
    role: roles[2],
  }).select('id firstName lastName userName ');
};
/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
/**
 * Get user by username
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByUserName = async (userName) => {
  return User.findOne({ userName });
};
/**
 * Get user by office
 * @param {string} office
 * @returns {Promise<User>}
 */
const getUsersByOffice = async (office) => {
  return User.find({ office });
};
/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  const { userName } = updateBody;

  if (userName && user.userName !== userName) {
    if (await User.isUserNameTaken(userName, userId))
      throw new ApiError(httpStatus.BAD_REQUEST, errors.USERNAME_ALREADY_USED);
    user.status.confirmed = false;
  }
  Object.assign(user, updateBody);
  await user.save();
  return user.populate(populatePatientConsultation).execPopulate();
};

const updateUserStatus = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, errors.USER_NOT_FOUND);
  }
  const { available } = updateBody;
  if (available === null) {
    throw new ApiError(httpStatus.NOT_FOUND, errors.AVAIBILITY_NOT_FOUND);
  }

  Object.assign(user, { status: { confirmed: user.status.confirmed, blocked: user.status.blocked, available } });
  await user.save();
  return user.populate(populatePatientConsultation).execPopulate();
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUserByUserName,
  queryPatients,
  getPatientById,
  getUsersByOffice,
  getUsersByUserName,
  searchPatientByName,
  updateUserStatus,
  searchDoctorByName,
};
