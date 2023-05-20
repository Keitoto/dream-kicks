import { Cart } from '@/types/Cart';

import { UserInfo } from './UserInfo';

export type Order = Omit<Cart, 'cartItems'> & {
  _id: string;
  orderItems: Cart['cartItems'];
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paidAt: string;
  createdAt: string;
  paymentResult: {
    emailAddress: string;
    paymentId: string;
    status: string;
    updateTime: string;
  };
  user: UserInfo;
};
