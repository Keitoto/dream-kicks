import { FC, ReactNode } from 'react';
import { Alert } from '@mantine/core';

const MessageBox: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Alert title="There was an error" color="red">
      {children}
    </Alert>
  );
};

export default MessageBox;
