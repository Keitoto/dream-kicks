import LoadingBox from '@/components/LoadingBox';
import ProductList from '@/components/Product/ProductList';
import { Product } from '@/types/Product';
import { Container } from '@mantine/core';
import axios from 'axios';
import useSWR from 'swr';
import { Helmet } from 'react-helmet-async';

export const HomePage = () => {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', (url) =>
    axios.get(url).then((res) => res.data)
  );

  if (isLoading)
    return (
      <div>
        <LoadingBox />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <>
      <Helmet>
        <title>Dream Kicks</title>
        <meta name="description" content="Home page for Dream Kicks" />
      </Helmet>

      <Container>
        <ProductList products={data} />
      </Container>
    </>
  );
};
