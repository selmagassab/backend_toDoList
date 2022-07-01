const express = require('express');
const taskRoute = require('./task.route');
const userRoute = require('./user.route');

// const { deleteAll } = require('../../services');

const router = express.Router();

router.use('/tasks', taskRoute);
router.use('/users', userRoute);

// route for developer delete all database
// router.delete('/delete-all', deleteAll.deleteAll);

module.exports = router;
