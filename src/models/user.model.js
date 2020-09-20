import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { values } from 'ramda';

import { LANG } from '~/constants';
import UUID from '~/mongoose/schema-types/uuid-schema-type';

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: { type: UUID, default: uuidv4 },
  role: { type: String, required: true },
  permissions: { type: Number, required: true },
  displayName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isValidated: { type: Boolean, required: true },
  validateCode: { type: String, required: true },
  validateExpireDate: { type: Date, required: true },
  restoreCode: { type: String, required: true },
  restoreExpireDate: { type: Date, required: true },
  joinDate: { type: Date, required: true },
  avatar: { type: String },
  lang: { type: String, enum: values(LANG), required: true },
});
UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
