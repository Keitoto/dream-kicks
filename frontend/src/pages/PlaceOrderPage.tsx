import { Link, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import {
  Title,
  Container,
  Grid,
  Card,
  AspectRatio,
  Text,
  List,
  Divider,
} from '@mantine/core';

import { CheckoutSteps } from '@/components/CheckoutSteps';
import { OrderSummary } from '@/components/OrderPreview/OrderSummary';
import { useCreateOrderMutation } from '@/hooks/orderHooks';
import { useAppDispatch, useAppSelector } from '@/store';
import { savePrices, selectCart, clearCart } from '@/store/cartSlice';
import { selectUserInfo } from '@/store/userSlice';

// helper function to round to 2 decimal places
const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

export const PlaceOrderPage = () => {
  const navigate = useNavigate();

  // get redux state
  const cart = useAppSelector(selectCart);
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // redirect if not saved shipping address
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // calculate prices
  const itemsPrice = round2(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  // save prices to redux store
  dispatch(savePrices({ itemsPrice, shippingPrice, taxPrice, totalPrice }));

  // get react query mutation hook
  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

  // place order handler
  const handleOrder = async () => {
    try {
      const data = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        user: userInfo!,
      });
      if(!data.createdOrder) throw new Error('Order creation failed');
      dispatch(clearCart());
      navigate(`/order/${data.createdOrder._id}`);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  // redirect if payment method not saved
  useEffect(() => {
    if (!paymentMethod) navigate('/payment');
  }, [paymentMethod, navigate]);

  return (
    <>
      <Helmet>
        <title>Place Order</title>
        <meta name="description" content="Set Payment Method" />
      </Helmet>

      <CheckoutSteps step1 step2 step3 />

      <Container size="md" mt="xl">
        <Title order={1}>Preview Order</Title>
        <Grid mt="md">
          <Grid.Col span={8}>
            <Card withBorder>
              <Title order={2} size="h3">
                Shipping
              </Title>
              <Text>
                <strong>Name: </strong> {shippingAddress.fullName}
                <br />
                <strong>Address: </strong> {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </Text>
              <Link to="/shipping">Edit</Link>
            </Card>
            <Card withBorder mt="md">
              <Title order={2} size="h3">
                Payment
              </Title>
              <Text>
                <strong>Method: </strong> {paymentMethod}
              </Text>
              <Link to="/payment">Edit</Link>
            </Card>
            <Card withBorder mt="md">
              <Title order={2} size="h3">
                Items
              </Title>
              <List
                listStyleType="none"
                type="ordered"
                center
                classNames={{ itemWrapper: 'flex' }}
                mt="md"
              >
                {cartItems.map((item, index) => (
                  <>
                    <List.Item key={item._id}>
                      <Grid grow align="center">
                        <Grid.Col span={6}>
                          <Grid align="center">
                            <Grid.Col span={6}>
                              <AspectRatio ratio={1 / 1} maw={100}>
                                <img src={item.image} alt={item.name} />
                              </AspectRatio>
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <Link to={`/product/${item.slug}`}>
                                {item.name}
                              </Link>
                            </Grid.Col>
                          </Grid>
                        </Grid.Col>
                        <Grid.Col span={3} className="text-center">
                          {item.quantity}
                        </Grid.Col>
                        <Grid.Col span={3} className="text-center">
                          ${item.price}
                        </Grid.Col>
                      </Grid>
                    </List.Item>
                    {index !== cartItems.length - 1 && <Divider my="md" />}
                  </>
                ))}
              </List>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <OrderSummary
              isLoading={isLoading}
              isValid={cartItems.length === 0 && !isLoading}
              prices={{
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
              }}
              canOrder
              handleOrder={handleOrder}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
