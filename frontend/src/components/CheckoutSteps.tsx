import { FC } from 'react';
import { Stepper } from '@mantine/core';

type Props = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};
export const CheckoutSteps: FC<Props> = ({ step1, step2, step3, step4 }) => {
  const activeStep = step4 ? 4 : step3 ? 3 : step2 ? 2 : step1 ? 1 : 1;
  return (
    <Stepper active={activeStep}>
      <Stepper.Step label="Sign-In" />
      <Stepper.Step label="Shipping" />
      <Stepper.Step label="Payment" />
      <Stepper.Step label="Place Order" />
    </Stepper>
  );
};
