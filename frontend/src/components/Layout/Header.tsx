import { ActionIcon, Badge, Container, Flex, Menu, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Basket, User } from 'tabler-icons-react';
import { StyledLink } from '@/components/UI/StyledLink';
import { HEADER_HEIGHT } from '@/constants/styles';
import { useSignInMutation } from '@/hooks/userHooks';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectCartItems } from '@/store/cartSlice';
import { selectUserInfo, signIn, signOut } from '@/store/userSlice';

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

  const { mutateAsync: signInMutation } = useSignInMutation();

  const handleSignIn = async (email: string, password: string) => {
    try {
      const userInfo = await signInMutation({ email, password });
      dispatch(signIn(userInfo));
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <header className="fixed bg-white top-0 left-0 right-0 z-50">
      <Container size="lg">
        <Flex
          h={HEADER_HEIGHT}
          justify="space-between"
          align="center"
          direction="row"
          px="md"
        >
          <Link to="/" className="no-underline font-bold">
            <Text className="text-default text-2xl">Dream Kicks</Text>
          </Link>
          <nav>
            <Flex gap="md" align="center">
              <Menu trigger="hover">
                <Menu.Target>
                  <ActionIcon className="text-default">
                    <User />
                  </ActionIcon>
                </Menu.Target>
                {userInfo ? (
                  <Menu.Dropdown>
                    <Menu.Label>
                      <Text size="xs">{userInfo.name}</Text>
                    </Menu.Label>
                    <Menu.Divider />
                    <Menu.Item>
                      <StyledLink to="/orders">Order History</StyledLink>
                    </Menu.Item>
                    <Menu.Item
                      onClick={signOutHandler}
                      className="hover:text-hover"
                    >
                      Sign out
                    </Menu.Item>
                  </Menu.Dropdown>
                ) : (
                  <Menu.Dropdown>
                    <Menu.Item>
                      <Link to="/signin">Sign in</Link>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      onClick={() =>
                        handleSignIn('admin@example.com', '123456')
                      }
                    >
                      Test as Admin
                    </Menu.Item>
                    <Menu.Item
                      onClick={() =>
                        handleSignIn('customer@example.com', '123456')
                      }
                    >
                      Test as Customer
                    </Menu.Item>
                  </Menu.Dropdown>
                )}
              </Menu>

              <Link to="/cart" className="flex items-center gap-1">
                <Basket className="text-default" />
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
    </header>
  );
};
