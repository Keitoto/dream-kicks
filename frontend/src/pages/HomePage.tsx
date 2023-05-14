import LoadingBox from '@/components/LoadingBox';
import ProductList from '@/components/Product/ProductList';
import { Container } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { useGetProductsQuery } from '@/hooks/productHooks';
import MessageBox from '@/components/MessageBox';

export const HomePage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading)
    return (
      <div>
        <LoadingBox />
      </div>
    );
  if (error) return <MessageBox>Something went wrong</MessageBox>;
  if (!products) return <MessageBox>No products found</MessageBox>;

  return (
    <>
      <Helmet>
        <title>Dream Kicks</title>
        <meta name="description" content="Home page for Dream Kicks" />
      </Helmet>

      <Container>
        <ProductList products={products} />
      </Container>
    </>
  );
};
