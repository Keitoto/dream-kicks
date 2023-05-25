import { Center, Container } from '@mantine/core';
import { Helmet } from 'react-helmet-async';

import LoadingBox from '@/components/LoadingBox';
import MessageBox from '@/components/MessageBox';
import { ProductList } from '@/components/Product/ProductList';
import { SectionHeading } from '@/components/UI/SectionHeading';
import { useGetProductsQuery } from '@/hooks/productHooks';
import { Features } from '@/pages/HomePage/Features';
import { HeroSection } from '@/pages/HomePage/HeroSection';
import { ViewAll } from '@/pages/HomePage/ViewAll';

export const HomePage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading)
    return (
      <Center>
        <LoadingBox />
      </Center>
    );
  if (error)
    return (
      <Center>
        <MessageBox type="red" title="There was an error">
          Failed to load products
        </MessageBox>
      </Center>
    );
  if (!products)
    return (
      <Center>
        <MessageBox type="red" title="No products found">
          Please try again
        </MessageBox>
      </Center>
    );

  return (
    <>
      <Helmet>
        <title>Dream Kicks</title>
        <meta name="description" content="Home page for Dream Kicks" />
      </Helmet>
      <HeroSection />
      <section className="mt-24 px-8">
        <Container mt="xl">
          <SectionHeading order={2}>New Arrivals</SectionHeading>
          <ProductList products={products.slice(0, 8)} className="mt-12" />
        </Container>
      </section>
      <section className="mt-24 px-8">
        <Container mt="xl">
          <SectionHeading order={2}>Best Seller</SectionHeading>
          <ProductList products={products.slice(8, 12)} className="mt-12" />
        </Container>
      </section>
      <ViewAll />
      <Features />
    </>
  );
};
