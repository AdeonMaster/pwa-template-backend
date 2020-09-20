import cors from 'cors';

import SignController from '~/controllers/sign.controller';

export default (app) => {
  app.post('/signup', cors(), SignController.signup);
  app.post('/signin', cors(), SignController.signin);
};
