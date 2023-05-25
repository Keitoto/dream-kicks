import { Cart } from '@/types/Cart';

import { UserInfo } from './UserInfo';

export type Order = Omit<Cart, 'cartItems'> & {
  _id: string;
  createdAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: Cart['cartItems'];
  paidAt: string;
  paymentResult: {
    emailAddress: string;
    paymentId: string;
    status: string;
    updateTime: string;
  };
  user: UserInfo;
};
