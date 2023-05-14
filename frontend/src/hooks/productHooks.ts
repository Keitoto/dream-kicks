import { apiClient } from '@/components/apiClient';
import { Product } from '@/types/Product';
import { useQuery } from '@tanstack/react-query';

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'], // key for cache
    queryFn: async () => (await apiClient.get<Product[]>('/api/products')).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug], // key for cache
    queryFn: async () =>
      (await apiClient.get<Product>(`/api/products/slug/${slug}`)).data,
  });
