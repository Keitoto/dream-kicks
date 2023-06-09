import { model, Schema, Types } from 'mongoose';

import {
  CartItem,
  Order,
  PaymentResult,
  ShippingAddress,
} from '../types/Order';

const ShippingAddressSchema = new Schema<ShippingAddress>(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    lat: Number,
    lng: Number,
  },
  { _id: false }
);

const ItemSchema = new Schema<CartItem>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  { _id: false }
);

const PaymentResultSchema = new Schema<PaymentResult>(
  {
    paymentId: { type: String, required: true },
    status: { type: String, required: true },
    updateTime: { type: String, required: true },
    emailAddress: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<Order>({
  // _id: Types.ObjectId,
  orderItems: { type: [ItemSchema], required: true },
  shippingAddress: ShippingAddressSchema,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  paymentMethod: { type: String, required: true },
  paymentResult: PaymentResultSchema,

  itemsPrice: { type: Number, required: true, default: 0 },
  shippingPrice: { type: Number, required: true, default: 0 },
  taxPrice: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now() },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: Date,
});

export const OrderModel = model<Order>('Order', OrderSchema);
