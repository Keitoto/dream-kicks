import { model, Schema } from 'mongoose';

import { User } from '../types/User';

const UserSchema = new Schema<User>({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
});

export const UserModel = model<User>('User', UserSchema);
