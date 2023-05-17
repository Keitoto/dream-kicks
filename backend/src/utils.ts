import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from './types/User';

export const generateToken = (user: User) => {
  return jwt.sign(
    {
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

// isAuth is a middleware function that checks if the user is authenticated.
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-param-reassign
    req.user = decoded as {
      name: string;
      _id: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next();
  } else {
    res.status(401).send({ message: 'Invalid Token' });
  }
};
