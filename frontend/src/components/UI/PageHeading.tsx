import { FC, ReactNode } from 'react';

import { Title, Text } from '@mantine/core';
import { title } from 'process';

type Props = {
  children: ReactNode;
};
export const PageHeading: FC<Props> = ({ children }) => {
  return (
    <div className="py-8">
      <Title order={1}>{children}</Title>
    </div>
  );
};
