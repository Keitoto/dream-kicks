import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { productRouter } from './router/productRouter';
import { seedRouter } from './router/seedRouter';

dotenv.config();
const PORT = 5000;
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Failed to connect to MongoDB'));

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.use('/api/products', productRouter);
app.use('/api/seed', seedRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
