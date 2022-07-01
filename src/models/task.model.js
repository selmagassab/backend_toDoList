const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    taskName: { type: String, required: true },
    taskContent: { type: String, required: true },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
