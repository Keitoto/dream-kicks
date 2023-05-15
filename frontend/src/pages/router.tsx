import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from '@/App';
import { CartPage } from '@/pages/CartPage';
import { HomePage } from '@/pages/HomePage';
import { PaymentMethodPage } from '@/pages/PaymentMethodPage';
import { PlaceOrderPage } from '@/pages/PlaceOrderPage';
import { ProductPage } from '@/pages/ProductPage';
import { ShippingAddressPage } from '@/pages/ShippingAddressPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { SignInPage } from '@/pages/SigninPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="shipping" element={<ShippingAddressPage />} />
      <Route path="payment" element={<PaymentMethodPage />} />
      <Route path="placeorder" element={<PlaceOrderPage />} />
    </Route>
  )
);
