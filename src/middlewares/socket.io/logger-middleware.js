/* eslint no-param-reassign:0 */
import { call } from 'ramda';

import createLogger from '~/utils/server/logger';

const logger = createLogger();

export default (listedEvents = []) => (socket, next) => {
  const { onevent, emit } = socket;
  const { _id } = socket.decoded;

  socket.onevent = (packet) => {
    const [event, data] = packet.data;

    if (listedEvents.includes(event)) {
      const time = new Date().toISOString();
      const line = `${time} socket ← ${_id} ${event} ${JSON.stringify(data)}`;

      call(logger.debug || console.log, line);
    }

    onevent.call(socket, packet);
  };

  socket.emit = (event, ...args) => {
    if (listedEvents.includes(event)) {
      const time = new Date().toISOString();
      const line = `${time} socket → ${_id} ${event} ${JSON.stringify(args[0])}`;

      call(logger.debug || console.log, line);
    }

    emit.call(socket, event, ...args);
  };

  next();
};
