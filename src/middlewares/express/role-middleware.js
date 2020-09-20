import { responseError } from '~/utils';
import STRINGS from '~/locale/strings';

export default (roles = []) => (request, response, next) => {
  if (!roles.includes(request?.decoded?.role || [])) {
    responseError(response, 403, STRINGS.ACCESS_DENIED_ERROR);
    return;
  }

  next();
};
