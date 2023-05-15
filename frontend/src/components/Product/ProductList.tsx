import { SimpleGrid } from '@mantine/core';
import { FC } from 'react';
import ProductCard from '@/components/Product/ProductCard';
import { Product } from '@/types/Product';

type Props = {
  products: Product[];
};

const ProductList: FC<Props> = ({ products }) => {
  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
