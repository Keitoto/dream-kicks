import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/components/apiClient';
import { Product } from '@/types/Product';

export const useGetProductsQuery = () =>
  useQuery({
    queryFn: async () => (await apiClient.get<Product[]>('/api/products')).data,
    queryKey: ['products'], // key for cache
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryFn: async () =>
      (await apiClient.get<Product>(`/api/products/slug/${slug}`)).data,
    queryKey: ['products', slug], // key for cache
  });
