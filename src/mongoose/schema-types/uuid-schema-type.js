import mongoose from 'mongoose';

import { isValidUUID } from '~/utils';

function UUID(key, options) {
  mongoose.SchemaType.call(this, key, options, 'UUID');
}
UUID.prototype = Object.create(mongoose.SchemaType.prototype);

// eslint-disable-next-line func-names
UUID.prototype.cast = function (value) {
  if (!isValidUUID(value)) {
    throw new Error(`UUID: ${value} is not a valid uuid`);
  }

  return value;
};

mongoose.Schema.Types.UUID = UUID;

export default UUID;
