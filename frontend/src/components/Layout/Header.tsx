import { useAppSelector } from '@/store';
import { selectCartItems } from '@/store/cartSlice';
import { Badge, Container, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Header = () => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <Container size="lg">
      <Flex
        mih={50}
        justify="space-between"
        align="center"
        direction="row"
        wrap="nowrap"
        px="md"
      >
        <Link to="/">Dream Kicks</Link>
        <nav>
          <Flex gap="md">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <Badge variant="light" color="blue">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Link>
          </Flex>
        </nav>
      </Flex>
    </Container>
  );
};
