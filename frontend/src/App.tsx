import { AppShell, Navbar, Space } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '@/store';

import { HEADER_HEIGHT } from '@/constants/styles';
import { Sidebar } from '@/components/Layout/Sidebar';
import { selectIsAdmin } from '@/store/userSlice';

import { Header, Footer } from './components/Layout';

const App = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  return (
    <>
      {isAdmin ? (
        // Admin dashboard
        <AppShell
          padding={0}
          header={<Header />}
          aside={
            <Navbar
              hiddenBreakpoint="sm"
              width={{ lg: 160, sm: 100 }}
              height="100%"
            >
              <Sidebar />
            </Navbar>
          }
        >
          <Outlet />
        </AppShell>
      ) : (
        // Normal user
        <AppShell padding={0} header={<Header />} footer={<Footer />}>
          <Space h={HEADER_HEIGHT} />
          <Outlet />
        </AppShell>
      )}
      <ToastContainer position="bottom-center" limit={1} />
    </>
  );
};

export default App;
