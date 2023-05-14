import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { products } from '../data';
import { ProductModel } from '../models/productModel';

export const seedRouter = express.Router();

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const newProducts = await ProductModel.insertMany(products);
    res.send({ newProducts });
  })
);
