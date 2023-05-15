import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, TextInput, Title, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSigninMutation } from '../hooks/userHooks';
import { selectUserInfo, signin } from '@/store/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';

export const SigninPage = () => {
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

  const user = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  // react-query mutation
  const { mutateAsync: signinMutation, isLoading } = useSigninMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userInfo = await signinMutation(form.values);
      dispatch(signin(userInfo));
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate(redirect);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

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
      </Container>
    </>
  );
};
