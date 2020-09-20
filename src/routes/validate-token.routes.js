import authMiddleware from '~/middlewares/express/auth-middleware';

export default (app) => {
  /* eslint-disable-next-line no-unused-vars */
  app.post('/validate-token', authMiddleware, async (_, response) => {
    response.json({});
  });
};
