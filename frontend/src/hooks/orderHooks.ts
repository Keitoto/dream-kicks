import { useMutation, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/components/apiClient';
import { Order } from '@/types/Order';

export const useGetOrderDetailsByIdQuery = (id: string) =>
  useQuery({
    queryFn: async () => (await apiClient.get<Order>(`/api/orders/${id}`)).data,
    queryKey: ['orders', id], // key for cache
  });

export const useGetPayPalClientIdQuery = () =>
  useQuery({
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>('/api/keys/paypal')).data,
    queryKey: ['paypalClientId'],
  });

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `/api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
  });

type OrderMutationInput = Pick<
  Order,
  | 'paymentMethod'
  | 'shippingAddress'
  | 'orderItems'
  | 'itemsPrice'
  | 'shippingPrice'
  | 'taxPrice'
  | 'totalPrice'
  | 'user'
>;

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: OrderMutationInput) =>
      (
        await apiClient.post<{ createdOrder?: Order; message: string }>(
          '/api/orders',
          order
        )
      ).data,
  });

export const useGetUserOrdersQuery = () =>
  useQuery({
    queryFn: async () => (await apiClient.get<Order[]>('/api/orders')).data,
    queryKey: ['orders'],
  });
