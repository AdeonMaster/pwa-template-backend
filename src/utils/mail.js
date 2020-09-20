import nodemailer from 'nodemailer';

import { MAIL_CONFIG } from '~/constants';

const transporter = nodemailer.createTransport(MAIL_CONFIG);

export const sendMail = (options) => transporter.sendMail(options);
