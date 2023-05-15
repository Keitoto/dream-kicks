import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { UserModel } from '../models/userModel';
import { generateToken } from '../utils';

export const userRouter = express.Router();

// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        // eslint-disable-next-line no-underscore-dangle
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

// POST /api/users/signup
userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const createdUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    res.send({
      // eslint-disable-next-line no-underscore-dangle
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);
