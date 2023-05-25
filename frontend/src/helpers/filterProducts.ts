import { Product } from '@/types/Product';

type Filters = {
  availability: string[];
  category: string[];
  brand: string[];
};
export const filterProducts = (products: Product[], filters: Filters) => {
  let filteredProducts = products;

  // Filter by availability
  if (filters.availability.length === 1) {
    switch (filters.availability[0]) {
      case 'inStock':
        filteredProducts = filteredProducts.filter(
          (product) => product.numInStock > 0
        );
        break;
      case 'outOfStock':
        filteredProducts = filteredProducts.filter(
          (product) => product.numInStock === 0
        );
        break;
      default:
        break;
    }
  }

  // Filter by category
  if (filters.category.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.category.some((category) =>
        product.category.includes(category)
      )
    );
  }

  // Filter by brand
  if (filters.brand.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.brand.includes(product.brand)
    );
  }

  return filteredProducts;
};
