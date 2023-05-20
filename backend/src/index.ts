import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { orderRouter } from './router/orderRouter';
import { productRouter } from './router/productRouter';
import { seedRouter } from './router/seedRouter';
import { userRouter } from './router/userRouter';
import { keyRouter } from './router/keyRouter';

dotenv.config();
const PORT = 5000;
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Failed to connect to MongoDB'));

const app = express();

// Middleware for parsing JSON and urlencoded data so that we can access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/seed', seedRouter);
app.use('/api/keys', keyRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
