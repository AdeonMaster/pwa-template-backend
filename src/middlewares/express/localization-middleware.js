import { DEFAULT_LANG } from '~/constants';

export default (request, _, next) => {
  const lang = request.headers.lang || DEFAULT_LANG;

  request.lang = lang;
  next();
};
