import { FC } from 'react';
import { SimpleGrid } from '@mantine/core';

import ProductCard from '@/components/Product/ProductCard';
import { Product } from '@/types/Product';

type Props = {
  products: Product[];
};

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </SimpleGrid>
  );
};