import { Helmet } from 'react-helmet-async';

export const ProductPage = () => {
  return (
    <>
      <Helmet>
        <title>Dream Kicks</title>
        <meta name="description" content="Home page for Dream Kicks" />
      </Helmet>
      <div className="text-red-100">ProductPage</div>
    </>
  );
};
