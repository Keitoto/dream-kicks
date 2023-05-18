import { useParams } from 'react-router-dom';

import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import {
  Badge,
  Button,
  Container,
  Grid,
  Image,
  List,
  Table,
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
      <Container>
        <Grid gutter="xl">
          <Grid.Col span={6}>
            <Image src={product.image} alt={product.name} />
          </Grid.Col>
          <Grid.Col span={3}>
            <List>
              <List.Item>
                <h1>{product.name}</h1>
              </List.Item>
              <List.Item>Price: ${product.price}</List.Item>
              <List.Item>
                Description:
                <p>{product.description}</p>
              </List.Item>
            </List>
          </Grid.Col>
          <Grid.Col span={3}>
            <Table verticalSpacing="xl" withBorder withColumnBorders>
              <tbody>
                <tr>
                  <th className="py-1 pt-4">Price:</th>
                  <td className="py-1 pt-4">${product.price}</td>
                </tr>
                <tr>
                  <th className="py-1">Status:</th>
                  <td>
                    {product.numInStock > 0 ? (
                      <Badge color="green" radius="sm" variant="filled">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge color="red" radius="sm" variant="filled">
                        Out of Stock
                      </Badge>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="py-1">Qty:</th>
                  <td>
                    <select ref={quantityRef}>
                      {[...Array(product.numInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-center" colSpan={2}>
                    <Button type="button" onClick={addToCartHandler}>
                      Add to Cart
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
