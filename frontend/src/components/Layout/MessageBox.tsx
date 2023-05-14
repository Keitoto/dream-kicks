import { Alert } from '@mantine/core';
import { FC, ReactNode } from 'react';

const MessageBox: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Alert title="There was an error" color="red">
      {children}
    </Alert>
  );
};

export default MessageBox;
