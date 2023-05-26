import { Fragment, useEffect } from 'react';

import { useAppSelector } from '@/store';
import {
  AspectRatio,
  Card,
  Container,
  Divider,
  Grid,
  Text,
  List,
  Title,
  Button,
} from '@mantine/core';
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoadingBox from '@/components/LoadingBox';
import MessageBox from '@/components/MessageBox';
import { OrderSummary } from '@/components/OrderPreview/OrderSummary';
import { PageHeading } from '@/components/UI/PageHeading';
import {
  useGetOrderDetailsByIdQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from '@/hooks/orderHooks';
import { selectUserInfo } from '@/store/userSlice';

export const OrderPage = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const { id: orderId } = useParams();

  if (!orderId) return <div>Order Not Found</div>;

  const {
    data: order,
    error,
    isLoading,
    refetch,
  } = useGetOrderDetailsByIdQuery(orderId);

  const { isLoading: loadingPay, mutateAsync: payOrder } =
    usePayOrderMutation();

  const testPayHandler = async () => {
    await payOrder({ orderId: orderId! });
    refetch();
    toast.success('Order paid');
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypalConfig } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPayPalScript = async () => {
        await paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypalConfig.clientId,
            currency: 'EUR',
          },
        });
        await paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPayPalScript();
    }
  }, [paypalConfig, paypalDispatch]);

  const payPalButtonTransactionProps: PayPalButtonsComponentProps = {
    createOrder: (data, actions) => {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        .then((orderID: string) => {
          return orderID;
        });
    },
    onApprove: (data, actions) => {
      return actions.order!.capture().then(async (details) => {
        try {
          payOrder({ orderId: orderId!, ...details });
          refetch();
          toast.success('Order paid');
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
          toast.error('Something went wrong');
        }
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error('Something went wrong');
    },
    style: {
      layout: 'vertical',
    },
  };

  if (isLoading) return <LoadingBox />;
  if (error) return <div>Failed to load order</div>;
  if (!order) return <div>Order Not Found</div>;

  const {
    itemsPrice,
    orderItems,
    paymentMethod,
    shippingAddress,
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
        <PageHeading>Order {orderId}</PageHeading>
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
                  Delivered at {order.paidAt.toString()}
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
                  Paid at {order.paidAt.toString()}
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
                              <Link to={`/products/${item.slug}`}>
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
            {!order.isPaid && (
              <Card withBorder mt="md">
                {isPending ? (
                  <LoadingBox />
                ) : isRejected ? (
                  <MessageBox type="red">
                    Failed to connect to PayPal
                  </MessageBox>
                ) : (
                  <>
                    <PayPalButtons {...payPalButtonTransactionProps} />
                    <Button onClick={testPayHandler}>Test Pay</Button>
                  </>
                )}
              </Card>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
