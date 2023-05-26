import { useAppDispatch, useAppSelector } from '@/store';
import {
  Anchor,
  Badge,
  Container,
  Grid,
  Image,
  Breadcrumbs,
  Text,
  Title,
  List,
} from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ButtonWithCounter } from '@/components/ButtonWithCounter';
import { RelatedProducts } from '@/components/Product/RelatedProducts';
import { SectionHeading } from '@/components/UI/SectionHeading';
import { useGetProductDetailsBySlugQuery } from '@/hooks/productHooks';
import { addItemToCart, selectCart } from '@/store/cartSlice';

export const ProductPage = () => {
  // react-router
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

  // loading state
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  if (!product) return <div>Product not found</div>;

  // deconstruct product
  const { numInStock, name, description, price, brand, category, _id, image } =
    product;

  const addMax = numInStock - currentNumInCart;
  const hasStock = numInStock > 0;

  const bread = [
    { href: '/', title: 'Home' },
    { href: '/products', title: 'Products' },
    { href: `products/${slug}`, title: name },
  ].map((item, index, arr) =>
    index === arr.length - 1 ? (
      <Text key={index} size="sm">
        {item.title}
      </Text>
    ) : (
      <Anchor href={item.href} key={index} size="sm">
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
      <section className="px-8 py-6 bg-bg">
        <Container size="xl">
          <Breadcrumbs>{bread}</Breadcrumbs>
        </Container>
      </section>

      <section className="px-4 py-8">
        <Container mt="xl">
          <Grid gutter="xl">
            {/* left side */}
            <Grid.Col span={6} pt={0}>
              <Image src={`/products/${image}.png`} alt={name} />
            </Grid.Col>

            {/* Right side */}
            <Grid.Col span={6} pt={0}>
              <Title order={1} size="md">
                {name}
              </Title>
              <Text size="xl">${price}</Text>
              <Text c="gray" size="sm" mt="lg">
                {description}
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

              <List listStyleType="none" size="sm" c="gray" spacing="xs">
                <List.Item>
                  <span className="">Brand : </span>
                  <span className="text-default">{brand}</span>
                </List.Item>
                <List.Item>
                  <span className="">Category : </span>
                  <span className="text-default">
                    {category.map((cat) => `${cat}, `)}
                  </span>
                </List.Item>
                <List.Item>
                  <span className="">Status : </span>
                  <span className="text-default">
                    {numInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </List.Item>
              </List>
            </Grid.Col>
          </Grid>
          <section className='mt-32'>
            <SectionHeading order={2}>You may also like</SectionHeading>
            <RelatedProducts _id={_id} brand={brand} category={category} />
          </section>
        </Container>
      </section>
    </>
  );
};
