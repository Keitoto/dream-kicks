import express, { Request, Response } from 'express';

import { products } from './data';

const app = express();
const PORT = 5000;

app.get('/api/products', (req: Request, res: Response) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
} );