import './index.css';

import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from '@/pages/router';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HelmetProvider>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  </HelmetProvider>
);
