import { Product } from '@/types/Product';

export type CartItem = Pick<
  Product,
  'name' | 'price' | 'numInStock' | 'slug' | '_id'
> & {
  image: Product['image'] | undefined;
  quantity: number;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentMethod = 'PayPal' | 'Stripe';

export type Cart = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
