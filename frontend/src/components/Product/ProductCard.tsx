import { FC } from 'react';

import {
  Card,
  AspectRatio,
  Title,
  Image,
  Text,
  Button,
  Flex,
  Overlay,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StyledLink } from '@/components/UI/StyledLink';
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
      radius="none"
      padding="none"
      className="flex flex-col"
    >
      <Card.Section>
        <AspectRatio ratio={1 / 1} ref={ref}>
          <Image src={`/products/${product.image}.png`} alt={product.name} />
          {hovered && (
            <Overlay
              className="flex flex-col justify-center items-center gap-4 transition-opacity"
              // onClick={() => {
              //   navigate(`/product/${product.slug}`);
              // }}
              opacity={0.1}
            >
              <Button
                onClick={() => navigate(`/product/${product.slug}`)}
                w="80%"
                radius="xl"
                variant="default"
              >
                View Detail
              </Button>
              <Button
                onClick={() =>
                  addItemToCartHandler(convertProductToCartItem(product))
                }
                w="80%"
                radius="xl"
                disabled={product.numInStock === 0}
              >
                {product.numInStock === 0 ? 'Out of stock' : 'Add to Cart'}
              </Button>
            </Overlay>
          )}
        </AspectRatio>
      </Card.Section>
      <Flex direction="column" className="flex-1" py="md">
        <StyledLink to={`/product/${product.slug}`}>
          <Title order={2} size="14px" weight="500" w="100%">
            {product.name}
          </Title>
        </StyledLink>
        <Text c="gray.6" size="sm">
          ${product.price}
        </Text>
      </Flex>
    </Card>
  );
};

export default ProductCard;
