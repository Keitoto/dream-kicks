import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';

import { products } from './data';

dotenv.config();

const app = express();
const PORT = 5000;
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.get('/api/products', (req: Request, res: Response) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
