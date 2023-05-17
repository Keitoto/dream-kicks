import { FC } from 'react';
import { List, Card, Title, Grid, Button, Divider } from '@mantine/core';

import LoadingBox from '@/components/LoadingBox';
import { useAppSelector } from '@/store';
import { selectCart } from '@/store/cartSlice';

type Props = {
  isLoading: boolean;
  isValid: boolean;
  handleOrder: () => void;
};

export const OrderSummary: FC<Props> = ({
  isValid,
  isLoading,
  handleOrder,
}) => {
  const { itemsPrice, taxPrice, totalPrice, shippingPrice } =
    useAppSelector(selectCart);
  return (
    <Card withBorder>
      <Title order={2} size="h3">
        Order Summary
      </Title>
      <List listStyleType="none" mt="md" classNames={{ itemWrapper: 'flex' }}>
        <List.Item>
          <Grid>
            <Grid.Col span={6}>Items</Grid.Col>
            <Grid.Col span={6}>${itemsPrice.toFixed(2)}</Grid.Col>
          </Grid>
        </List.Item>
        <Divider my="xs" />
        <List.Item>
          <Grid>
            <Grid.Col span={6}>Shipping</Grid.Col>
            <Grid.Col span={6}>${shippingPrice.toFixed(2)}</Grid.Col>
          </Grid>
        </List.Item>
        <Divider my="xs" />
        <List.Item>
          <Grid>
            <Grid.Col span={6}>Tax</Grid.Col>
            <Grid.Col span={6}>${taxPrice.toFixed(2)}</Grid.Col>
          </Grid>
        </List.Item>
        <Divider my="xs" />
        <List.Item>
          <Grid>
            <Grid.Col span={6}>Total</Grid.Col>
            <Grid.Col span={6}>${totalPrice.toFixed(2)}</Grid.Col>
          </Grid>
        </List.Item>
      </List>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <Button type="button" onClick={handleOrder} disabled={isValid} mt="md" fullWidth>
          Place Order
        </Button>
      )}
    </Card>
  );
};
