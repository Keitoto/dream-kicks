import { Button, Container, Table, Title } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '@/components/LoadingBox';
import MessageBox from '@/components/MessageBox';
import { useGetUserOrdersQuery } from '@/hooks/orderHooks';
import { PageHeading } from '@/components/UI/PageHeading';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { data: orders, error, isLoading } = useGetUserOrdersQuery();

  if (!orders)
    return (
      <MessageBox type="red">
        You have no orders yet. Go back and add some items to your cart.
      </MessageBox>
    );
  if (isLoading) return <LoadingBox />;
  if (error)
    return (
      <MessageBox type="red">
        Error fetching orders. Please try again later.
      </MessageBox>
    );

  return (
    <>
      <Helmet>
        <title>Order History | Dream Kicks</title>
      </Helmet>
      <Container>
        <PageHeading>Order History</PageHeading>
        <Table striped>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default OrderHistoryPage;
