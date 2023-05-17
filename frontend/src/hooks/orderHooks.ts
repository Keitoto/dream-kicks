import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/components/apiClient';
import { Order } from '@/types/Order';

type OrderInput = Pick<
  Order,
  | 'paymentMethod'
  | 'shippingAddress'
  | 'orderItems'
  | 'itemsPrice'
  | 'shippingPrice'
  | 'taxPrice'
  | 'totalPrice'
>;

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: OrderInput) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          '/api/orders',
          order
        )
      ).data,
  });
