import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { OrderModel } from '../models/orderModel';
import { Order } from '../types/Order';
import { Product } from '../types/Product';
import { isAuth } from '../utils';

export const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const newOrder: Order = {
        ...req.body,
        orderItems: req.body.orderItems.map((item: Product) => ({
          ...item,
          product: item._id,
        })),
        user: req.user._id,
      };
      const createdOrder = await OrderModel.create(newOrder);
      res.status(201).json({ message: 'New Order Created', createdOrder });
    }
  })
);
