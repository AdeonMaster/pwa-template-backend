import { v4 as uuidv4 } from 'uuid';

import UserModel from '~/models/user.model';
import { hash } from '~/utils';
import { sendMail } from '~/utils/mail';
import ResponseError from '~/utils/server/response-error';

const USER_NOT_FOUND = 'User with given email is not found';
const RESTORE_REQUEST_ALREADY_EXIST = 'There is already a restore request';
const WRONG_OR_EXPIRED_RESTORATION_CODE = 'Wrong or expired restoration code';
const NEW_PASSWORD_CANT_BE_THE_SAME_AS_OLD_ONE = "New password can't be the same as old one";

export default class RestoreService {
  static restoreBegin = async ({ email }) => {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      throw new ResponseError(USER_NOT_FOUND);
    }

    const now = new Date();
    const { restoreExpireDate } = findUser;

    if (now < restoreExpireDate) {
      throw new ResponseError(RESTORE_REQUEST_ALREADY_EXIST);
    }

    const restoreCode = uuidv4();

    await UserModel.updateOne(
      { email },
      {
        $set: {
          restoreCode,
          restoreExpireDate: new Date(new Date().getTime() + 3600000),
        },
      },
    );

    sendMail({
      from: 'support@pwa-template-backend.md',
      to: email,
      subject: 'Password restoration',
      text: `/restore/${restoreCode}`,
    });
  };

  static restoreEnd = async ({ restoreCode, password }) => {
    const user = await UserModel.findOne({ restoreCode });
    if (!user) {
      throw new ResponseError(WRONG_OR_EXPIRED_RESTORATION_CODE);
    }

    const newPassword = hash(password);
    if (user.password === newPassword) {
      throw new ResponseError(NEW_PASSWORD_CANT_BE_THE_SAME_AS_OLD_ONE);
    }

    const now = new Date();
    const { _id, restoreExpireDate } = user;

    if (new Date(restoreExpireDate) < now) {
      throw new ResponseError(WRONG_OR_EXPIRED_RESTORATION_CODE);
    }

    await UserModel.updateOne(
      { _id },
      {
        $set: {
          password: hash(password),
          restoreCode: uuidv4(),
          restoreExpireDate: new Date(),
        },
      },
    );

    return true;
  };
}
