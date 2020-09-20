import withSocket from 'socket.io';

import socketAuthMiddleware from '~/middlewares/socket.io/auth-middleware';
import socketLoggerMiddleware from '~/middlewares/socket.io/logger-middleware';

// enrich socket with onMessage callback & emitMessage function
const enrichSocket = (io) => {
  const messageDict = {};

  // eslint-disable-next-line no-param-reassign
  io.onMessage = (message, callback) => {
    if (!messageDict[message]) {
      messageDict[message] = [callback];
    } else {
      messageDict[message].push(callback);
    }
  };

  io.on('connection', (socket) => {
    const emitMessage = (data) => socket.emit('message', data);

    socket.on('message', (data) => {
      if (data.type && messageDict[data.type]) {
        messageDict[data.type].forEach((callback) => {
          try {
            callback(data, {
              decoded: socket.decoded,
              emitMessage,
            });
          } catch (error) {
            if (error.name !== 'ResponseError') {
              console.log(error);
            }
          }
        });
      }
    });
  });
};

const enhanceWithSocket = (server) => {
  const io = withSocket(server);
  io.use(socketAuthMiddleware);
  io.use(socketLoggerMiddleware(['message']));

  enrichSocket(io);

  return io;
};

export default enhanceWithSocket;
