import { FC, ReactNode } from 'react';
import { Alert } from '@mantine/core';

type Props = {
  title?: string;
  type?: 'red' | 'blue' | 'yellow';
  children: ReactNode;
};

const MessageBox: FC<Props> = ({ children, title = '', type = 'blue' }) => {
  return (
    <Alert title={title} color={type}>
      {children}
    </Alert>
  );
};

export default MessageBox;
