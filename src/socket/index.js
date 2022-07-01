// eslint-disable-next-line import/order
const app = require('../app');

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

const http = require('http').createServer(app);
const io = require('socket.io')(http);
// var port = process.env.PORT || 9000;
const { userService } = require('../services/user.service');
// http.listen(8080, '127.0.0.1');
http.listen(8080);

// io.on('connection', function (socket) {
//   console.log('A user is connected');
// });

const handleSocketClosed = (socket) => {
  // eslint-disable-next-line no-console
  console.log('socket closed [roomId:%s', socket.roomId);
};

const handleSocketMessage = async (socket, data) => {
  const { request, payload } = data;

  switch (request) {
    case 'LOGIN_USER':
      await userService.updateUserById(payload.id, { isConnected: true, lastSocketId: socket.id });
      break;
    case 'LOGIN_LOGOUT':
      await userService.updateUserById(payload.id, { isConnected: false, lastConnection: payload.date });
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('unknown request %s', data.request);
  }
};

const init = () => {
  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('--------');
    // eslint-disable-next-line no-console
    console.log('socket', socket.id);

    socket.on('message', async (message) => {
      try {
        // const data = JSON.parse(message);
        const data = message;
        await handleSocketMessage(socket, data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('failed to handle message [error:%o]', error);
        socket.send(JSON.stringify({ request: 'error', error: error.message || error }));
      }
    });

    socket.on('connect_error', (err) => {
      // eslint-disable-next-line no-console
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on('disconnect', () => {
      handleSocketClosed(socket);
    });
    socket.on('close', () => {
      handleSocketClosed(socket);
    });
    // eslint-disable-next-line no-console
    socket.on('error', (error) => console.error('socket errored', error));
  });
};

module.exports = {
  init,
  io,
};
