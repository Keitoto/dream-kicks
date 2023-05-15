import App from '@/App';
import { CartPage } from '@/pages/CartPage';
import { HomePage } from '@/pages/HomePage';
import { ProductPage } from '@/pages/ProductPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
    </Route>
  )
);
