import { CartItem } from '@/types/Cart';
import { Product } from '@/types/Product';

export const convertProductToCartItem = (product: Product): CartItem => {
  return {
    name: product.name,
    _id: product._id,
    image: product.image,
    numInStock: product.numInStock,
    price: product.price,
    quantity: 1,
    slug: product.slug,
  };
};
