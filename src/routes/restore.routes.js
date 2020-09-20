import RestoreController from '~/controllers/restore.controller';

export default (app) => {
  app.post('/restore', RestoreController.restoreBegin);
  app.post('/restore/:restoreCode', RestoreController.restoreEnd);
};
