import { Product } from './Product';
import { User } from './User';

export type CartItem = {
  name: string;
  image: string;
  price: number;
  product: Product;
  quantity: number;
};

export type ShippingAddress = {
  address: string;
  city: string;
  country: string;
  fullName: string;
  lat: number;
  lng: number;
  postalCode: string;
};

export type PaymentMethod = 'PayPal' | 'Stripe';

export type PaymentResult = {
  emailAddress: string;
  paymentId: string;
  status: string;
  updateTime: string;
};

export type Order = {
  _id: string;
  deliveredAt: Date;
  isDelivered: boolean;
  isPaid: boolean;
  items: CartItem[];
  itemsPrice: number;
  paidAt: Date;
  paymentMethod: PaymentMethod;
  paymentResult: {
    emailAddress: string;
    paymentId: string;
    status: string;
    updateTime: string;
  };
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: User;
};
