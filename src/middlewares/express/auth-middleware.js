import jwt from 'jsonwebtoken';

import { JWT_SIGN_SECRET } from '~/constants';
import { responseError } from '~/utils';
import { getLocalizedString } from '~/localization';
import STRINGS from '~/locale/strings';

export default (request, response, next) => {
  const { lang } = request;

  // Express headers are auto converted to lowercase
  let token = request.headers['x-access-token'] || request.headers.authorization;

  if (!token) {
    responseError(response, 401, getLocalizedString(lang, STRINGS.TOKEN_NOT_SUPPLIED_ERROR));
    return;
  }

  // Remove Bearer from string
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, JWT_SIGN_SECRET, (error, decoded) => {
    if (error) {
      responseError(
        response,
        401,
        getLocalizedString(
          lang,
          error.name === 'TokenExpiredError'
            ? STRINGS.TOKEN_EXPIRED_ERROR
            : STRINGS.TOKEN_INVALID_ERROR,
        ),
      );
      return;
    }

    request.decoded = decoded;
    next();
  });
};
