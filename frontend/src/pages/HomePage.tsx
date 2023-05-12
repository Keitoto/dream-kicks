import ProductList from '@/components/Layout/Product/ProductList';
import { Product } from '@/types/Product';
import { Container } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res: { data: Product[] } = await axios.get('/api/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  // const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // const { data: products, error, isLoading } = useSWR('http://localhost:5000/api/products', fetcher);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
};
