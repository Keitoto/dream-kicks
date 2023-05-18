import bcrypt from 'bcryptjs';

import { Product } from './types/Product';
import { User } from './types/User';
import { Order } from './types/Order';

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

// export const orders: Order[] = [
//   {
//     deliveredAt: new Date(),
//     isDelivered: true,
//     isPaid: true,
//     paidAt: new Date(),
//     paymentResult: {
//       emailAddress: 'admin@example.com',
//       paymentId: 'PAYID-LRJ4Q6QJ5S123456789',
//       status: 'COMPLETED',
//       updateTime: '2020-10-05T21:42:02Z',
//     },
//     user: users[0],
//     orderItems: [
//       {
//         name: products[0].name,
//         image: products[0].image,
//         price: products[0].price,
//         product: products[0],
//         quantity: 2,
//       },
//       {
//         name: products[1].name,
//         image: products[1].image,
//         price: products[1].price,
//         product: products[1],
//         quantity: 1,
//       },
//     ],
//     shippingAddress: {
//       fullName: 'John Smith',
//       address: '1234 Main Street',
//       city: 'Boston',
//       country: 'United States',
//       postalCode: '02101',
//       lat: 42.35843,
//       lng: -71.05977,
//     },
//     paymentMethod: 'PayPal',
//     itemsPrice: 689.98,
//     shippingPrice: 0,
//     taxPrice: 103.5,
//     totalPrice: 793.48,
//   },
// ];
