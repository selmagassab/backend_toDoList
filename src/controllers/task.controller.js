const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  try {
    const task = await taskService.createTask({ ...req.body });
    res.status(httpStatus.CREATED).send(task);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const getTasks = catchAsync(async (req, res) => {
  try {
    const result = await taskService.getTasks();
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const getTaskById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    res.send(task);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const deleteTask = catchAsync(async (req, res) => {
  try {
    const deletedTask = await taskService.deleteTask(req.params.id);
    res.status(httpStatus.OK).send(deletedTask);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const updateTask = catchAsync(async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.send(task);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  getTaskById,
};
