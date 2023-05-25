import { FC, ReactNode } from 'react';

import { AppShell } from '@mantine/core';
import { Footer } from '@/components/Layout/Footer';
import { Header } from '@/components/Layout/Header';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <AppShell header={<Header />} footer={<Footer />}>
      {children}
    </AppShell>
  );
};
