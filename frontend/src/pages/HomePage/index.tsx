import { Helmet } from 'react-helmet-async';
import { Container } from '@mantine/core';

import LoadingBox from '@/components/LoadingBox';
import MessageBox from '@/components/MessageBox';
import { ProductList } from '@/components/Product/ProductList';
import { SectionHeading } from '@/components/UI/SectionHeading';
import { useGetProductsQuery } from '@/hooks/productHooks';
import { HeroSection } from '@/pages/HomePage/HeroSection';

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
      <HeroSection />
      <Container mt="xl">
        <section className="mt-24">
          <SectionHeading order={2}>New Arrivals</SectionHeading>
          <ProductList products={products.slice(0, 8)} className="mt-12" />
        </section>
        <section className="mt-24">
          <SectionHeading order={2}>Best Seller</SectionHeading>
          <ProductList products={products.slice(8, 12)} className="mt-12" />
        </section>
      </Container>
    </>
  );
};
