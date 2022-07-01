const httpStatus = require('http-status');
// const { userService } = require('.');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');
const { errors } = require('../utils/errors.constant');

/**
 * Create task
 * @param {Object} body
 * @returns {Promise<Task>}
 */
const createTask = async (body) => {
  const task = await Task.create(body);
  return task;
  // const user = await userService.getUserById(appointment.patient);
  // user.patientAppointments.push(appointment.id);
  // await user.save();
  // return appointment.populate(populatePatientAppointment).execPopulate();
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, errors.APPOINTMENT_NOT_FOUND);
  }
  return task;
};

/**
 * Get get All Tasks
 */
const getTasks = async () => {
  const tasks = Task.find();
  return tasks;
};

/**
 * Update task by id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Office>}
 */
const updateTask = async (id, body) => {
  const task = await getTaskById(id);
  Object.assign(task, { ...body });
  await task.save();
  // return appointment.populate(populatePatientAppointment).execPopulate();
  return task;
};

/**
 * Delete task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const deleteTask = async (id) => {
  const task = await getTaskById(id);
  await task.remove();
  return task;
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
