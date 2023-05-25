import { Product } from '@/types/Product';

export const getArrayFromProductValue = (
  products: Product[],
  key: 'brand' | 'category'
) => [...new Set(products.flatMap((product) => product[key]))];
