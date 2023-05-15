import bcrypt from 'bcryptjs';

import { Product } from './types/Product';
import { User } from './types/User';

export const products: Product[] = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    image: 'https://picsum.photos/id/4/420/300',
    numInStock: 10,
    price: 89.99,
    slug: 'airpods-wireless-bluetooth-headphones',
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    image: 'https://picsum.photos/id/3/420/300',
    numInStock: 0,
    price: 599.99,
    slug: 'iphone-11-pro-256gb-memory',
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    image: 'https://picsum.photos/id/1/420/300',
    numInStock: 10,
    price: 89.99,
    slug: 'airpods-wireless-bluetooth-headphones',
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    image: 'https://picsum.photos/id/2/420/300',
    numInStock: 7,
    price: 599.99,
    slug: 'iphone-11-pro-256gb-memory',
  },
];

export const users: User[] = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true,
    password: bcrypt.hashSync('123456'),
  },
  {
    name: 'Customer User',
    email: 'customer@example.com',
    isAdmin: false,
    password: bcrypt.hashSync('123456'),
  },
];
