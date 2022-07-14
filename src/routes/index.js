const express = require('express');
const taskRoute = require('./task.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

const router = express.Router();

router.use('/tasks', taskRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;
