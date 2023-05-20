import { Link, useParams } from 'react-router-dom';

import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  AspectRatio,
  Card,
  Container,
  Divider,
  Grid,
  Text,
  List,
  Title,
} from '@mantine/core';

import LoadingBox from '@/components/LoadingBox';
import MessageBox from '@/components/MessageBox';
import { OrderSummary } from '@/components/OrderPreview/OrderSummary';
import { useGetOrderDetailsByIdQuery } from '@/hooks/orderHooks';
import { useAppSelector } from '@/store';
import { selectUserInfo } from '@/store/userSlice';

export const OrderPage = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const { id: orderId } = useParams();

  if (!orderId) return <div>Order Not Found</div>;

  const {
    data: order,
    isLoading,
    error,
  } = useGetOrderDetailsByIdQuery(orderId);

  if (isLoading) return <LoadingBox />;
  if (error) return <div>Failed to load order</div>;
  if (!order) return <div>Order Not Found</div>;

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = order;

  return (
    <>
      <Helmet>
        <title>Dream Kicks | Order {orderId}</title>
        <meta name="description" content="Order details page for Dream Kicks" />
      </Helmet>
      <Container>
        <Title order={1}>Order {orderId}</Title>
        <Grid>
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
              {order.isDelivered ? (
                <MessageBox type="blue">
                  Delivered at {order.paidAt.toDateString()}
                </MessageBox>
              ) : (
                <MessageBox type="yellow">Not Delivered</MessageBox>
              )}
            </Card>
            <Card withBorder mt="md">
              <Title order={2} size="h3">
                Payment
              </Title>
              <Text>
                <strong>Method: </strong> {paymentMethod}
              </Text>
              {order.isPaid ? (
                <MessageBox type="blue">
                  Paid at {order.paidAt.toDateString()}
                </MessageBox>
              ) : (
                <MessageBox type="yellow">Not Paid</MessageBox>
              )}
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
                {orderItems.map((item, index) => (
                  <Fragment key={item.name}>
                    <List.Item>
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
                    {index !== orderItems.length - 1 && <Divider my="md" />}
                  </Fragment>
                ))}
              </List>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <OrderSummary
              isLoading={isLoading}
              isValid={orderItems.length === 0 && !isLoading}
              prices={{
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
              }}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
