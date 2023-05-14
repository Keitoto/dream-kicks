import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { ProductModel } from '../models/productModel';

export const productRouter = express.Router();

// /api/products
productRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

// /api/products/:slug
productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });

    if (!product) res.status(404).json({ message: 'Product not found' });

    res.json(product);
  })
);
