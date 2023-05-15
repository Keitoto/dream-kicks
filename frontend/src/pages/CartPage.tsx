import MessageBox from '@/components/MessageBox';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  addItemToCart,
  removeItemFromCart,
  selectCartItems,
} from '@/store/cartSlice';
import { CartItem } from '@/types/Cart';
import {
  Container,
  Flex,
  Grid,
  List,
  Title,
  UnstyledButton,
  Image,
  Button,
  Card,
  Divider,
  AspectRatio,
  SimpleGrid,
} from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircleMinus, CirclePlus } from 'tabler-icons-react';

export const CartPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (item.numInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
      return;
    }
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=shipping');
  };

  return (
    <>
      <Helmet>
        <title>Dream Kicks | Shopping Cart</title>
        <meta name="description" content="Cart page for Dream Kicks" />
      </Helmet>
      <Container>
        <Title order={1}>Shopping Cart</Title>
        <Grid>
          <Grid.Col span={8}>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              <List listStyleType="none" type="unordered">
                {cartItems.map((item) => (
                  <List.Item key={item._id}>
                    <Grid align="center">
                      <Grid.Col span={4}>
                        <Grid align="center">
                          <Grid.Col span={6}>
                            <AspectRatio ratio={1 / 1}>
                              <Image src={item.image} alt={item.name} />
                            </AspectRatio>
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </Grid.Col>
                        </Grid>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Flex justify="center">
                          <UnstyledButton
                            onClick={() =>
                              updateCartHandler(item, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                          >
                            <CircleMinus />
                          </UnstyledButton>
                          {item.quantity}
                          <UnstyledButton
                            onClick={() =>
                              updateCartHandler(item, item.quantity + 1)
                            }
                          >
                            <CirclePlus />
                          </UnstyledButton>
                        </Flex>
                      </Grid.Col>
                      <Grid.Col span={2}>${item.price}</Grid.Col>
                      <Grid.Col span={3}>
                        <Button
                          type="button"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          Delete
                        </Button>
                      </Grid.Col>
                    </Grid>
                  </List.Item>
                ))}
              </List>
            )}
          </Grid.Col>
          <Grid.Col span={4}>
            <Card withBorder>
              <Card.Section withBorder p="sm">
                <Title order={3}>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items) : $
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </Title>
              </Card.Section>
              <Card.Section p="sm">
                <Button
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  fullWidth
                >
                  Proceed to Checkout
                </Button>
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default CartPage;
