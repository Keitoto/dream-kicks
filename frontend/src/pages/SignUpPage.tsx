import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Title, TextInput, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useAppDispatch, useAppSelector } from '@/store';
import { selectUserInfo, signIn } from '@/store/userSlice';

import { useSignUpMutation } from '../hooks/userHooks';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl || '/';

  // Redux
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const form = useForm({
    initialValues: {
      name: '',
      confirmPassword: '',
      email: '',
      password: '',
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Name is too short' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
      email: (value) =>
        !value.includes('@') ? 'Please enter a valid email' : null,
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
    },
  });

  // react-query mutation
  const { isLoading, mutateAsync: signUpMutation } = useSignUpMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.validate();
    if (Object.keys(form.errors).length > 0) return;

    try {
      const userInfo = await signUpMutation({
        name: form.values.name,
        email: form.values.email,
        password: form.values.password,
      });

      dispatch(signIn(userInfo));
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate(redirect);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign up to your account" />
      </Helmet>
      <Container size="400px">
        <Title order={1}>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            mt="sm"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Name"
            placeholder="your name"
            mt="sm"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Password"
            placeholder="1234abcd"
            mt="sm"
            {...form.getInputProps('password')}
          />
          <TextInput
            label="Confirm Password"
            mt="sm"
            {...form.getInputProps('confirmPassword')}
          />
          <Button disabled={isLoading} type="submit" mt="sm">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};
