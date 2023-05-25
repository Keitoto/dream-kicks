import { FC } from 'react';
import { SimpleGrid } from '@mantine/core';

import ProductCard from '@/components/Product/ProductCard';
import { Product } from '@/types/Product';

type Props = {
  className?: string;
  products: Product[];
};

export const ProductList: FC<Props> = ({ className, products }) => {
  return (
    <SimpleGrid
      className={className}
      spacing="lg"
      verticalSpacing="2rem"
      cols={4}
      breakpoints={[
        { cols: 3, maxWidth: 'lg' },
        { cols: 2, maxWidth: 'sm' },
        { cols: 1, maxWidth: 'xs' },
      ]}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </SimpleGrid>
  );
};
