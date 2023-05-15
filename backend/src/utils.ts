import jwt from 'jsonwebtoken';

import { User } from './types/User';

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'temp_secret',
    {
      expiresIn: '30d',
    }
  );
};
