import { CartItem } from '@/types/Cart';
import { Product } from '@/types/Product';

export const convertProductToCartItem = (product: Product): CartItem => {
  return {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    numInStock: product.numInStock,
    quantity: 1,
  };
};
