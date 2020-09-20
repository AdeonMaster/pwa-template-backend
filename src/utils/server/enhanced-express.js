import express from 'express';
import methods from 'methods';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import cors from 'cors'; // https://github.com/expressjs/cors

import errorHandlerMiddleware from '~/middlewares/express/error-handler-middleware';
import localizationMiddleware from '~/middlewares/express/localization-middleware';
import loggerMiddleware from '~/middlewares/express/logger-middleware';

const TOO_MANY_REQUESTS = 'Too many requests, please try again later.';

// error handler for async routes
const asyncHandler = (routeCallback) => (req, res, next) =>
  Promise.resolve(routeCallback(req, res, next)).catch((error) => {
    switch (error.name) {
      case 'ResponseError':
      case 'ValidationError': {
        res.status(400);
        res.json({
          code: 400,
          error: error.message,
        });
        break;
      }

      default: {
        console.log(error);

        res.status(500);
        res.json({
          code: 500,
          error: 'Server internal error',
        });
      }
    }
  });

const isFileUrl = (pathname) => pathname.split('/').pop().indexOf('.') > -1;

const enrichMethodsWithAsyncHandler = (app) => {
  methods.forEach((method) => {
    if (app[method]) {
      const methodFn = app[method];

      // eslint-disable-next-line no-param-reassign
      app[method] = (...args) => {
        const argsLen = args.length;

        if (argsLen === 2 || argsLen === 3) {
          const callbackArgIndex = argsLen - 1;

          /* eslint-disable no-param-reassign */
          args[callbackArgIndex] = asyncHandler(args[callbackArgIndex]);

          return methodFn.apply(app, args);
        }

        return methodFn.apply(app, args);
      };
    }
  });
};

export default () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(localizationMiddleware);
  // TO DO: should not be applied to swagger ??? (stop limitting file resources)
  app.use(
    rateLimit({
      windowMs: 1000, // 1 second
      max: 3, // limit each IP to 3 requests per windowMs
      message: {
        error: TOO_MANY_REQUESTS,
        code: 429,
      },
      handler: (request, response, next) => {
        if (isFileUrl(request.path)) {
          next();
        } else {
          response.status(429).send({
            error: TOO_MANY_REQUESTS,
            code: 429,
          });
        }
      },
    }),
  );
  app.use(loggerMiddleware);
  app.use(errorHandlerMiddleware);

  // enrich all known express methods with async handler
  enrichMethodsWithAsyncHandler(app);

  return app;
};
