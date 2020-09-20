import { responseError } from '~/utils';
import { getLocalizedString } from '~/localization';
import STRINGS from '~/locale/strings';

export default (error, request, response, next) => {
  if (error) {
    const { lang } = request;

    responseError(response, 500, getLocalizedString(lang, STRINGS.INTERNAL_SERVER_ERROR));
    return;
  }

  next();
};
