const mongoose = require('mongoose');
const app = require('./app');

const config = require('./config/config');
const logger = require('./config/logger');

let gfs;
let server;

mongoose
  // connect(config.mongoose.url, config.mongoose.options)
  .connect(
    'mongodb+srv://admin:admin@cluster0.9elbpna.mongodb.net/todolist?retryWrites=true&w=majority',
    config.mongoose.options
  )
  .then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((err) => logger.info(err));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
module.exports = gfs;
