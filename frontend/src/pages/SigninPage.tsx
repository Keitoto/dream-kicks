import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Button, TextInput, Title, Container, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useAppDispatch, useAppSelector } from '@/store';
import { selectUserInfo, signIn } from '@/store/userSlice';

import { useSignInMutation } from '../hooks/userHooks';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl || '/';

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  // react-query mutation
  const { isLoading, mutateAsync: signInMutation } = useSignInMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userInfo = await signInMutation(form.values);
      dispatch(signIn(userInfo));
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate(redirect);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
      </Helmet>
      <Container size="400px">
        <Title order={1}>Sign In</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            mt="sm"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Password"
            placeholder="1234abcd"
            mt="sm"
            {...form.getInputProps('password')}
          />
          <Button disabled={isLoading} type="submit" mt="sm">
            Submit
          </Button>
        </form>
        <Group mt='lg'>
          Not a member?{' '}
          <Link to="/signup" style={{ color: 'blue' }}>
            Sign up
          </Link>
        </Group>
      </Container>
    </>
  );
};
