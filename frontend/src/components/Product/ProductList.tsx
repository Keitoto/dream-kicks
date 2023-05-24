import { FC } from 'react';
import { SimpleGrid } from '@mantine/core';

import ProductCard from '@/components/Product/ProductCard';
import { Product } from '@/types/Product';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductList: FC<Props> = ({ products, className }) => {
  return (
    <SimpleGrid
      className={className}
      spacing="lg"
      verticalSpacing="2rem"
      cols={4}
      breakpoints={[
        { maxWidth: 'lg', cols: 3 },
        { maxWidth: 'sm', cols: 2 },
        { maxWidth: 'xs', cols: 1 },
      ]}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </SimpleGrid>
  );
};
