import './index.css';

import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from '@/pages/router';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HelmetProvider>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ReduxProvider>
    </MantineProvider>
  </HelmetProvider>
);
