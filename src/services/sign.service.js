/* eslint no-underscore-dangle:0 */

import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import UserModel from '~/models/user.model';

import { JWT_LIFETIME, JWT_SIGN_SECRET } from '~/constants';
import { hash, generateDisplayName, isValidPassword, isValidEmail } from '~/utils';
import { sendMail } from '~/utils/mail';
import { getLocalizedString } from '~/localization';
import STRINGS from '~/locale/strings';
import ResponseError from '~/utils/server/response-error';

export default class SignService {
  static getSignedToken = async (_id, customJwtLifetime) => {
    const userDetails = await UserModel.findOne({ _id })
      .select({
        role: 1,
        permissions: 1,
      })
      .lean();
    console.log(userDetails);
    return jwt.sign(userDetails, JWT_SIGN_SECRET, {
      expiresIn: customJwtLifetime || JWT_LIFETIME,
    });
  };

  static signup = async ({ lang, email, password }) => {
    if (!isValidEmail(email)) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_EMAIL_FORMAT));
    }

    if (!isValidPassword(password)) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_PASSWORD_FORMAT));
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.EMAIL_IS_ALREADY_IN_USE));
    }

    const { _id } = await UserModel.create({
      role: 'pupil',
      permissions: 0b0,
      displayName: generateDisplayName(),
      email,
      password: hash(password),
      isValidated: false,
      validateCode: uuidv4(),
      validateExpireDate: new Date(0),
      restoreCode: uuidv4(),
      restoreExpireDate: new Date(0),
      joinDate: new Date(),
      xp: 0,
      achievements: 0b0,
      avatar: '',
      accountType: 'common', // facebook, gmail
      firstTime: true,
      lang,
    });

    const token = await this.getSignedToken(_id);

    sendMail({
      from: 'noreply@pwa-template-baclend.md',
      to: email,
      subject: getLocalizedString(lang, 'email.subject.signup'),
      text: getLocalizedString(lang, 'email.subject.text'),
    });

    return token;
  };

  static signin = async ({ lang, email, password }) => {
    if (!isValidEmail(email)) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_EMAIL_FORMAT));
    }

    if (!isValidPassword(password)) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_PASSWORD_FORMAT));
    }

    const user = await UserModel.findOne({
      email,
      password: hash(password),
    });
    if (!user) {
      throw new ResponseError(getLocalizedString(lang, STRINGS.INVALID_USER_CREDENTIALS));
    }

    const { _id } = user;

    return this.getSignedToken(_id);
  };
}
