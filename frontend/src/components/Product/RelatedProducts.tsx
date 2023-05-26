import { FC } from 'react';

import { filterProducts } from '@/helpers/filterProducts';
import { useGetProductsQuery } from '@/hooks/productHooks';
import { Product } from '@/types/Product';
import { ProductList } from '@/components/Product/ProductList';

type Props = {
  _id: string;
  brand: string;
  category: string[];
};

export const RelatedProducts: FC<Props> = ({ _id, brand, category }) => {
  const { data: allProducts, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!allProducts) return <div>No products found</div>;

  const products = allProducts.filter((product) => product._id !== _id);

  let productInCategory: Product[] = [];
  let productInBrand: Product[] = [];

  if (category.length > 0) {
    productInCategory = filterProducts(products, { category });
  }
  if (brand.length > 0) {
    productInBrand = filterProducts(products, { brand: [brand] });
  }

  // Priority one: both in category and brand
  const duplicates = productInCategory.filter(item1 =>
    productInBrand.some(item2 => item2._id === item1._id)
  );

  // Priority two: either in category or brand
  const secondPriority = productInCategory.filter(item1 =>
    productInBrand.every(item2 => item2._id !== item1._id)
  );

  const relatedProducts = [...duplicates, ...secondPriority].slice(0, 4);

  return <ProductList products={relatedProducts} />;
};
