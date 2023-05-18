import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { OrderModel } from '../models/orderModel';
import { CartItem, Order } from '../types/Order';
import { isAuth } from '../utils';

export const orderRouter = express.Router();

orderRouter.get(
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  })
);

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const createdOrder = await OrderModel.create({
        ...req.body,
        orderItems: req.body.orderItems.map((item: CartItem) => ({
          ...item,
        })),
        user: req.body.user._id,
      });
      res.status(201).json({ message: 'New Order Created', createdOrder });
    }
  })
);
