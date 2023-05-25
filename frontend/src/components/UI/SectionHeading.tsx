import { FC, ReactNode } from 'react';
import { Title } from '@mantine/core';

export const SectionHeading: FC<{
  children: ReactNode;
  order: 1 | 2 | 3 | 4 | 5 | 6;
}> = ({ children,order }) => {
  return (
    <Title order={order} className='flex items-center justify-center mt-8' mb="lg">
      <Border/>
      {children}
      <Border/>
    </Title>
  );
};

const Border = () => {
  return (
    <span className='block w-16 h-0.5 bg-black mx-8' />
  )
}