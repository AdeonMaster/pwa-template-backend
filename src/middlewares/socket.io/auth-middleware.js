import jwt from 'jsonwebtoken';

import { getLocalizedString } from '~/localization';
import { JWT_SIGN_SECRET, DEFAULT_LANG } from '~/constants';
import STRINGS from '~/locale/strings';

export default (socket, next) => {
  if (!socket?.handshake?.query?.token) {
    next(new Error(getLocalizedString(DEFAULT_LANG, STRINGS.TOKEN_NOT_SUPPLIED_ERROR)));
    return;
  }

  const { token } = socket.handshake.query;

  jwt.verify(token, JWT_SIGN_SECRET, (error, decoded) => {
    if (error) {
      next(
        new Error(
          getLocalizedString(
            DEFAULT_LANG,
            error.name === 'TokenExpiredError'
              ? STRINGS.TOKEN_EXPIRED_ERROR
              : STRINGS.TOKEN_INVALID_ERROR,
          ),
        ),
      );
      return;
    }

    /* eslint-disable no-param-reassign */
    socket.decoded = decoded;
    next();
  });
};
