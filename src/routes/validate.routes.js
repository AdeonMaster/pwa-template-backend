import authMiddleware from '~/middlewares/express/auth-middleware';
import ValidateController from '~/controllers/validate.controller';

export default (app) => {
  app.post('/validate', authMiddleware, ValidateController.validateBegin);
  app.post('/validate/:validateCode', authMiddleware, ValidateController.validateEnd);
};
