import { useParams } from 'react-router-dom';

import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import {
  Anchor,
  Badge,
  Button,
  Container,
  Grid,
  Image,
  Breadcrumbs,
  Text,
  Title,
} from '@mantine/core';

import { useGetProductDetailsBySlugQuery } from '@/hooks/productHooks';
import { useAppDispatch } from '@/store';
import { addItemToCart } from '@/store/cartSlice';

export const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) throw new Error('No slug provided');

  // get react query query hook
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsBySlugQuery(slug);

  // get redux dispatch
  const dispatch = useAppDispatch();

  const quantityRef = useRef<HTMLSelectElement>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  if (!product) return <div>Product not found</div>;

  const hasStock = product.numInStock > 0;
  const bread = [
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
    { title: product.name, href: `products/${product.slug}` },
  ].map((item, index, arr) =>
    index === arr.length - 1 ? (
      <Text key={index}  size='sm'>{item.title}</Text>
    ) : (
      <Anchor href={item.href} key={index}  size='sm'>
        {item.title}
      </Anchor>
    )
  );

  const addToCartHandler = () => {
    const quantity = Number(quantityRef.current?.value);
    if (product.numInStock < quantity) {
      toast.error('Sorry. We do not have enough stock');
      return;
    }
    dispatch(addItemToCart({ ...product, quantity }));
    toast.success('Product added to cart');
  };

  return (
    <>
      <Helmet>
        <title>Dream Kicks</title>
        <meta name="description" content="Home page for Dream Kicks" />
      </Helmet>
      <Breadcrumbs p="lg" bg="gray.1">
        {bread}
      </Breadcrumbs>
      <Container mt='xl'>
        <Grid gutter="xl">
          <Grid.Col span={6}>
            <Image src={`/products/${product.image}.png`} alt={product.name} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Title order={1} size="md">
              {product.name}
            </Title>
            <Text size="xl">${product.price}</Text>
            <Text c="gray" size="sm" mt="lg">
              {product.description}
            </Text>
            <Grid mt="lg">
              <Grid.Col span={2}>Status:</Grid.Col>
              <Grid.Col span={10}>
                {product.numInStock > 0 ? (
                  <Badge color="green" radius="sm" variant="filled">
                    In Stock
                  </Badge>
                ) : (
                  <Badge color="red" radius="sm" variant="filled">
                    Out of Stock
                  </Badge>
                )}
              </Grid.Col>
            </Grid>
            <Grid mt="sm">
              <Grid.Col span={2}>Qty:</Grid.Col>
              <Grid.Col span={10}>
                {hasStock ? (
                  <select ref={quantityRef}>
                    {[...Array(product.numInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select disabled>
                    <option>0</option>
                  </select>
                )}
              </Grid.Col>
            </Grid>
            <Button
              type="button"
              onClick={addToCartHandler}
              disabled={!hasStock}
              mt="sm"
            >
              Add to Cart
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
