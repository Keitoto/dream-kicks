import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Footer } from './components/Layout';

const App = () => {
  return (
    <>
      <AppShell header={<Header />} footer={<Footer />}>
        <main>
          <Outlet />
        </main>
      </AppShell>
      <ToastContainer position="bottom-center" limit={1} />
    </>
  );
};

export default App;
