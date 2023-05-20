import { useMutation, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/components/apiClient';
import { Order } from '@/types/Order';

export const useGetOrderDetailsByIdQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id], // key for cache
    queryFn: async () => (await apiClient.get<Order>(`/api/orders/${id}`)).data,
  });

export const useGetPayPalClientIdQuery = () =>
  useQuery({
    queryKey: ['paypalClientId'],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>('/api/keys/paypal')).data,
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
        await apiClient.post<{ message: string; createdOrder?: Order }>(
          '/api/orders',
          order
        )
      ).data,
  });

export const useGetUserOrdersQuery = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: async () => (await apiClient.get<Order[]>('/api/orders')).data,
  });
