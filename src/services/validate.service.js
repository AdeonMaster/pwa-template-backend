/* eslint no-underscore-dangle:0 */

import { v4 as uuidv4 } from 'uuid';

import UserModel from '~/models/user.model';
import { sendMail } from '~/utils/mail';
import ResponseError from '~/utils/server/response-error';

const USER_WITH_GIVEN_ID_IS_NOT_FOUND = 'User with given id is not found';
const USER_IS_ALREADY_VALIDATED = 'User is already validated';
const THERE_IS_ALREADY_A_VALIDATION_REQUEST = 'There is already a validation request';
const INVALID_OR_EXPIRED_VALIDATION_CODE = 'Invalid or expired validation code';

export default class ValidateService {
  static validateBegin = async ({ userid }) => {
    const findUser = await UserModel.findOne({
      _id: userid,
    });
    if (!findUser) {
      throw new ResponseError(USER_WITH_GIVEN_ID_IS_NOT_FOUND);
    }

    const now = new Date();
    const { isValidated, validateExpireDate, email } = findUser;

    if (isValidated) {
      throw new ResponseError(USER_IS_ALREADY_VALIDATED);
    }

    if (now < validateExpireDate) {
      throw new ResponseError(THERE_IS_ALREADY_A_VALIDATION_REQUEST);
    }

    await UserModel.updateOne(
      { _id: userid },
      {
        $set: {
          validateCode: uuidv4(),
          validateExpireDate: new Date(new Date().getTime() + 3600000),
        },
      },
    );

    sendMail({
      from: 'support@pwa-template-backend.md',
      to: email,
      subject: 'Click to validate',
      text: 'GGWP',
    });

    return true;
  };

  static validateEnd = async ({ validateCode }) => {
    const findUser = await UserModel.findOne({ validateCode });
    if (!findUser) {
      throw new ResponseError(INVALID_OR_EXPIRED_VALIDATION_CODE);
    }

    const { _id, email } = findUser;

    await UserModel.updateOne(
      { _id },
      {
        $set: {
          validateCode: uuidv4(),
          validateExpireDate: new Date(0),
          isValidated: true,
        },
      },
    );

    sendMail({
      from: 'support@pwa-template-backend.md',
      to: email,
      subject: 'Validated',
      text: 'GGWP',
    });

    return true;
  };
}
