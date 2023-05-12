import ProductList from '@/components/Layout/Product/ProductList';
import { products } from '@/data';
import { Container } from '@mantine/core';

export const Home = () => {
  return (
    <Container>
      <ProductList products={products}/>
    </Container>
  );
};
