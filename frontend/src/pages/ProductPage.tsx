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

  // get redux state
  const cart = useAppSelector(selectCart);
  const currentNumInCart =
    cart.cartItems.find((item) => item.slug === slug)?.quantity || 0;
  const dispatch = useAppDispatch();

  const quantityRef = useRef<HTMLSelectElement>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  if (!product) return <div>Product not found</div>;

  const addMax = numInStock - currentNumInCart;
  const hasStock = numInStock > 0;
  const bread = [
    { href: '/', title: 'Home' },
    { href: '/products', title: 'Products' },
    { href: `products/${product.slug}`, title: product.name },
  ].map((item, index, arr) =>
    index === arr.length - 1 ? (
      <Text key={index}  size='sm'>{item.title}</Text>
    ) : (
      <Anchor href={item.href} key={index}  size='sm'>
        {item.title}
      </Anchor>
    )
  );

  const addToCartHandler = (quantity: number) => {
    if (numInStock < quantity) {
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

              <div className="my-8">
                {currentNumInCart > 0 && (
                  <Badge color="blue" variant="light" className="mb-2">
                    This product is currently in your cart : {currentNumInCart}
                  </Badge>
                )}
                <ButtonWithCounter
                  max={addMax}
                  handleSubmit={addToCartHandler}
                  isAvailable={hasStock}
                />
              </div>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
