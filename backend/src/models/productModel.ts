import { model, Schema } from 'mongoose';

import { Product } from '../types/Product';

const ProductSchema = new Schema<Product>({
  _id: { type: String },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: [String], required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  numInStock: { type: Number, required: true },
  price: { type: Number, required: true },
  slug: { type: String, required: true },
});

export const ProductModel = model<Product>('Product', ProductSchema);
