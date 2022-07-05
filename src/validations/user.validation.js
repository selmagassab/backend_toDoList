const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    /* password: Joi.string().required().custom(password), */
  }),
};

const createAdmin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    /* password: Joi.string().required().custom(password), */
    firstName: Joi.string().required(),
    cin: Joi.number().integer(),
    phoneNumber: Joi.number().integer(),
    lastName: Joi.string().required(),
    role: Joi.string().valid('admin', 'patient', 'doctor', 'secretary'),
  }),
};
const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};
const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
const updateUserIsData = {
  body: Joi.object(),
};

module.exports = {
  createUser,
  createAdmin,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserIsData,
};
