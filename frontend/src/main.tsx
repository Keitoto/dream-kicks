import './index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';

import { router } from '@/pages/router';
import { store } from '@/store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HelmetProvider>
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{
        fontFamily: 'Roboto, sans-serif',
        primaryColor: 'teal',
      }}
    >
      <ReduxProvider store={store}>
        <PayPalScriptProvider
          options={{
            'client-id': 'sb',
          }}
          deferLoading={true}
        >
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PayPalScriptProvider>
      </ReduxProvider>
    </MantineProvider>
  </HelmetProvider>
);
