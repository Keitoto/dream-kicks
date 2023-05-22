import { Helmet } from 'react-helmet-async';
import { Container } from '@mantine/core';

import LoadingBox from '@/components/LoadingBox';
import MessageBox from '@/components/MessageBox';
import { ProductList } from '@/components/Product/ProductList';
import { useGetProductsQuery } from '@/hooks/productHooks';

export const HomePage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading)
    return (
      <div>
        <LoadingBox />
      </div>
    );
  if (error)
    return (
      <MessageBox type="red" title="There was an error">
        Failed to load products
      </MessageBox>
    );
  if (!products)
    return (
      <MessageBox type="red" title="No products found">
        Please try again
      </MessageBox>
    );

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
