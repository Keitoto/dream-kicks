import { Product } from '@/types/Product';

export type CartItem = Pick<
  Product,
  'name' | 'price' | 'numInStock' | 'slug' | '_id'
> & {
  image: Product['image'] | undefined;
  quantity: number;
};

export type ShippingAddress = {
  address: string;
  city: string;
  country: string;
  fullName: string;
  postalCode: string;
};

export type PaymentMethod = 'PayPal' | 'Stripe';

export type Cart = {
  cartItems: CartItem[];
  itemsPrice: number;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
