import Footer from '@/components/Layout/Footer';
import { Header } from '@/components/Layout/Header';
import { AppShell } from '@mantine/core';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <AppShell header={<Header />} footer={<Footer />}>
        <main>{children}</main>
      </AppShell>
    </>
  );
};
