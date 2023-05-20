import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Title, Button, Container, Radio } from '@mantine/core';

import { CheckoutSteps } from '@/components/CheckoutSteps';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectPaymentMethod,
  selectShippingAddress,
  savePaymentMethod,
} from '@/store/cartSlice';
import { PaymentMethod } from '@/types/Cart';

export const PaymentMethodPage = () => {
  const navigate = useNavigate();

  const savedPaymentMethod = useAppSelector(selectPaymentMethod);
  const shippingAddress = useAppSelector(selectShippingAddress);
  const dispatch = useAppDispatch();

  // redirect if not signed in
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>(savedPaymentMethod || 'PayPal');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <>
      <Helmet>
        <title>Payment Method</title>
        <meta name="description" content="Set Payment Method" />
      </Helmet>

      <CheckoutSteps step1 step2 />

      <Container size="400px">
        <Title order={1}>Payment Method</Title>
        <form onSubmit={handleSubmit}>
          <Radio.Group
            value={paymentMethod}
            onChange={setPaymentMethod as (value: PaymentMethod) => void}
            name="paymentMethod"
            label="Select Payment Method"
            withAsterisk
          >
            <Radio value="PayPal" label="PayPal" name="PayPal" />
            <Radio value="Stripe" label="Stripe" name="Stripe" />
          </Radio.Group>

          <Button type="submit" mt="sm">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};
