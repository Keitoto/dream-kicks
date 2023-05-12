import { Layout } from '@/components/Layout';
import { Home } from '@/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
