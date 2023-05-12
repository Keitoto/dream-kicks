import './index.css';

import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <App />
  </MantineProvider>
);
