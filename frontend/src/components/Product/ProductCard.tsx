import { Link, useNavigate } from 'react-router-dom';

import { FC } from 'react';
import { toast } from 'react-toastify';
import {
  Card,
  AspectRatio,
  Title,
  Image,
  Text,
  Button,
  Group,
  Flex,
  Box,
  Overlay,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';

import { convertProductToCartItem } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItemToCart, selectCartItems } from '@/store/cartSlice';
import { CartItem } from '@/types/Cart';
import { Product } from '@/types/Product';

type Props = {
  product: Product;
};

const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const { hovered, ref } = useHover();
  const navigate = useNavigate();

  const addItemToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.numInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
      return;
    }
    dispatch(addItemToCart({ ...item, quantity: 1 }));
    toast.success('Product added to cart');
  };

  return (
    <Card
      key={product._id}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="flex flex-col"
      ref={ref}
    >
      <Card.Section>
        <AspectRatio ratio={1 / 1}>
          <Image src={`/products/${product.image}.png`} alt={product.name} />
        </AspectRatio>
      </Card.Section>
      <Flex direction="column" className="flex-1" mt="lg">
        <Title order={2} size="sm" weight="500" w="100%">
          {product.name}
        </Title>
        <Text c="gray.6" size="sm">
          ${product.price}
        </Text>
      </Flex>
      {hovered && (
        <Overlay
          className="cursor-pointer flex flex-col justify-center items-center gap-4"
          onClick={() => {
            navigate(`/product/${product.slug}`);
          }}
          opacity={0.1}
        >
          <Button onClick={() => navigate(`/product/${product.slug}`)} w="80%" variant='default'>
            View Detail
          </Button>
          <Button
            onClick={() =>
              addItemToCartHandler(convertProductToCartItem(product))
            }
            w="80%"
            disabled={product.numInStock === 0}
          >
            {product.numInStock === 0 ? 'Out of stock' : 'Add to Cart'}
          </Button>
        </Overlay>
      )}
    </Card>
  );
};

export default ProductCard;
