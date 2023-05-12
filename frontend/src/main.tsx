import './index.css';

import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from '@/pages/router';
import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <RouterProvider router={router} />
  </MantineProvider>
);
