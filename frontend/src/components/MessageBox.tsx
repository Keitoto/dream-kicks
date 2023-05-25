import { FC, ReactNode } from 'react';
import { Alert } from '@mantine/core';

type Props = {
  children: ReactNode;
  type?: 'red' | 'blue' | 'yellow';
  title?: string;
};

const MessageBox: FC<Props> = ({ children, type = 'blue', title = '' }) => {
  return (
    <Alert title={title} color={type}>
      {children}
    </Alert>
  );
};

export default MessageBox;
