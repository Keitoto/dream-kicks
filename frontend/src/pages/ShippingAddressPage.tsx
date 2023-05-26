import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { Title, TextInput, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { CheckoutSteps } from '@/components/CheckoutSteps';
import { PageHeading } from '@/components/UI/PageHeading';
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
      address: shippingAddress?.address || '',
      city: shippingAddress?.city || '',
      country: shippingAddress?.country || '',
      fullName: shippingAddress?.fullName || '',
      postalCode: shippingAddress?.postalCode || '',
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
        <title>Shipping Address</title>
        <meta name="description" content="Sign in to your account" />
      </Helmet>
      <CheckoutSteps step1 />
      <Container size="400px">
        <PageHeading>Shipping Address</PageHeading>
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
