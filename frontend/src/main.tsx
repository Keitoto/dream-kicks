import './index.css';
import { MantineProvider } from '@mantine/core';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/store';

import { router } from '@/pages/router';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HelmetProvider>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        black: '#222',
        cursorType: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        primaryColor: 'teal',
      }}
    >
      <ReduxProvider store={store}>
        <PayPalScriptProvider
          options={{
            'client-id': 'sb',
          }}
          deferLoading
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
