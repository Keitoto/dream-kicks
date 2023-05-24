import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppShell } from '@mantine/core';

import 'react-toastify/dist/ReactToastify.css';
import { Header, Footer } from './components/Layout';

const App = () => {
  return (
    <>
      <AppShell padding={0} header={<Header />} footer={<Footer />}>
        <Outlet />
      </AppShell>
      <ToastContainer position="bottom-center" limit={1} />
    </>
  );
};

export default App;
