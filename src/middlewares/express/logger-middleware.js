import { call } from 'ramda';

import createLogger from '~/utils/server/logger';

const logger = createLogger();

export default (request, response, next) => {
  const timestamp = Date.now();
  const { method, url, body } = request;

  const date = new Date(timestamp).toISOString();
  // eslint-disable-next-line no-underscore-dangle
  const statusCode = response._header ? response.statusCode : -1;
  const line = `${date} https ${method} ${url} ${statusCode} ${JSON.stringify(body)}`;

  call(logger.debug || console.log, line);

  // TO DO: fix response.on('end') isn't called
  // response.on('end', () => {
  //   const date = new Date(timestamp).toISOString();
  //   // eslint-disable-next-line no-underscore-dangle
  //   const statusCode = response._header ? response.statusCode : -1;
  //   const requestDuration = Date.now() - timestamp;
  //   const line = `${date} https ${method} ${url} ${statusCode} ${requestDuration}ms ${JSON.stringify(body)}`;

  //   call(logger.debug || console.log, line);
  // });

  next();
};
