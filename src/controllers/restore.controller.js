import RestoreService from '~/services/restore.service';
import { getLocalizedString } from '~/localization';
import STRINGS from '~/locale/strings';
import ResponseError from '~/utils/server/response-error';

export default class RestoreController {
  static restoreBegin = async (request, response) => {
    const {
      lang,
      body: { email },
    } = request;

    if (!email) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_PARAMS));
    }

    await RestoreService.restoreBegin({ lang, email });

    return response.json([]);
  };

  static restoreEnd = async (request, response) => {
    const {
      lang,
      params: { restoreCode },
      body: { password },
    } = request;

    if (!restoreCode || !password) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_PARAMS));
    }

    await RestoreService.restoreEnd({ lang, restoreCode, password });

    return response.json([]);
  };
}
