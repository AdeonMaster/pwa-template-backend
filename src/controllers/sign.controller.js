import SignService from '~/services/sign.service';
import { getLocalizedString } from '~/localization';
import STRINGS from '~/locale/strings';
import ResponseError from '~/utils/server/response-error';

export default class SignController {
  static signup = async (request, response) => {
    const {
      lang,
      body: { email, password },
    } = request;

    if (!email || !password) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_PARAMS));
    }

    const token = await SignService.signup({ lang, email, password });

    return response.json({ token });
  };

  static signin = async (request, response) => {
    const {
      lang,
      body: { email, password },
    } = request;

    if (!email || !password) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_PARAMS));
    }

    const token = await SignService.signin({ lang, email, password });

    return response.json({ token });
  };
}
