import { Link } from 'react-router-dom';

import {
  Basket,
  ChevronDown,
} from 'tabler-icons-react';
import { Badge, Button, Container, Flex, Menu, Text } from '@mantine/core';

import { HEADER_HEIGHT } from '@/constants/styles';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectCartItems } from '@/store/cartSlice';
import { selectUserInfo, signOut } from '@/store/userSlice';

export const Header = () => {
  const cartItems = useAppSelector(selectCartItems);
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <Container size="lg">
      <Flex
        h={HEADER_HEIGHT}
        justify="space-between"
        align="center"
        direction="row"
        px="md"
      >
        <Link to="/" className="no-underline font-bold">
          <Text size="xl" color="teal">
            Dream Kicks
          </Text>
        </Link>
        <nav>
          <Flex gap="md" align="center">
            {userInfo ? (
              <Menu>
                <Menu.Target>
                  <Button rightIcon={<ChevronDown size={20} />}>
                    {userInfo.name}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Link to="/orders">Order History</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/signout" onClick={signOutHandler}>
                      Sign out
                    </Link>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link to="/signin">Sign in</Link>
            )}
            <Link to="/cart" className="flex items-center gap-1">
              <Basket color="black" />
              {cartItems.length > 0 && (
                <Badge variant="light" color="teal">
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
