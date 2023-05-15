import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Title, TextInput, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';

import { CheckoutSteps } from '@/components/CheckoutSteps';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectShippingAddress, saveShippingAddress } from '@/store/cartSlice';
import { selectUserInfo } from '@/store/userSlice';

export const ShippingAddressPage = () => {
  const navigate = useNavigate();

  const shippingAddress = useAppSelector(selectShippingAddress);
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  // redirect if not signed in
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const shippingAddressForm = useForm({
    initialValues: {
      fullName: shippingAddress?.fullName || '',
      address: shippingAddress?.address || '',
      city: shippingAddress?.city || '',
      postalCode: shippingAddress?.postalCode || '',
      country: shippingAddress?.country || '',
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingAddressForm.values));
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify(shippingAddressForm.values)
    );
    navigate('/payment');
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
      </Helmet>
      <CheckoutSteps step1 />
      <Container size="400px">
        <Title order={1}>Sign In</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Full Name"
            placeholder="Your Name"
            mt="sm"
            {...shippingAddressForm.getInputProps('fullName')}
          />
          <TextInput
            label="Address"
            placeholder="Your Address"
            mt="sm"
            {...shippingAddressForm.getInputProps('address')}
          />
          <TextInput
            label="City"
            placeholder="Your City"
            mt="sm"
            {...shippingAddressForm.getInputProps('city')}
          />
          <TextInput
            label="Postal Code"
            placeholder="Your Postal Code"
            mt="sm"
            {...shippingAddressForm.getInputProps('postalCode')}
          />
          <TextInput
            label="Country"
            placeholder="Your Country"
            mt="sm"
            {...shippingAddressForm.getInputProps('country')}
          />

          <Button type="submit" mt="sm">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};
