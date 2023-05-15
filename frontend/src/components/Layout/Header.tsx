import { Link } from 'react-router-dom';
import { Badge, Button, Container, Flex, Menu } from '@mantine/core';

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
            {userInfo ? (
              <Menu>
                <Menu.Target>
                  <Button>{userInfo.name}</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Link to="/profile">Profile</Link>
                    <Link to="/signout" onClick={signOutHandler}>
                      Sign out
                    </Link>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link to="/signin">Sign in</Link>
            )}
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
