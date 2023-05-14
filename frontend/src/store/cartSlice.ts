import { RootState } from '@/store';
import { Cart, CartItem, PaymentMethod } from '@/types/Cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Cart = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')!)
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? (localStorage.getItem('paymentMethod') as PaymentMethod)
    : 'PayPal',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === newItem._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === existingItem._id ? newItem : item
        );
      } else {
        state.cartItems.push(newItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const cartReducer = cartSlice.reducer;
