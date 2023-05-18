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
} from '@mantine/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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

  const addItemToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.numInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
      return;
    }
    dispatch(addItemToCart({ ...item, quantity }));
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
    >
      <Card.Section>
        <Link to={`/product/${product.slug}`}>
          <AspectRatio ratio={1920 / 1080}>
            <Image src={product.image} alt={product.name} />
          </AspectRatio>
        </Link>
      </Card.Section>
      <Flex direction="column" className="flex-1">
        <Group mt="sm">
          <Title order={2} size="h3">
            {product.name}
          </Title>
          <span>${product.price}</span>
        </Group>

        <Text mt="sm">{product.description}</Text>
        <Box mt="auto">
          <Button
            onClick={() => addItemToCartHandler(convertProductToCartItem(product))}
            fullWidth
            mt="md"
            className="self-end"
            disabled={product.numInStock === 0}
          >
            {product.numInStock === 0 ? 'Out of stock' : 'Add to Cart'}
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};

export default ProductCard;
