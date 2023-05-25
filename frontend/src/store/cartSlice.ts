import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { signOut } from '@/store/userSlice';
import { Cart, CartItem, PaymentMethod, ShippingAddress } from '@/types/Cart';

const initialState: Cart = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [],
  itemsPrice: 0,
  paymentMethod: localStorage.getItem('paymentMethod')
    ? (localStorage.getItem('paymentMethod') as PaymentMethod)
    : 'PayPal',
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')!)
    : {},
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  extraReducers: (builder) => {
    builder.addCase(signOut, (state) => {
      state = {
        cartItems: [],
        itemsPrice: 0,
        paymentMethod: 'PayPal',
        shippingAddress: {
          address: '',
          city: '',
          country: '',
          fullName: '',
          postalCode: '',
        },
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      };
    });
  },
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === newItem._id);
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
        };
        state.cartItems = state.cartItems.map((item) =>
          item._id === existingItem._id ? updatedItem : item
        );
      } else {
        state.cartItems.push(newItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    savePaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', state.paymentMethod);
    },
    savePrices(
      state,
      action: PayloadAction<
        Pick<Cart, 'itemsPrice' | 'shippingPrice' | 'taxPrice' | 'totalPrice'>
      >
    ) {
      state.itemsPrice = action.payload.itemsPrice;
      state.shippingPrice = action.payload.shippingPrice;
      state.taxPrice = action.payload.taxPrice;
      state.totalPrice = action.payload.totalPrice;
    },
    saveShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      );
    }
  },
});

export const {
  addItemToCart,
  clearCart,
  removeItemFromCart,
  savePaymentMethod,
  savePrices,
  saveShippingAddress,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectShippingAddress = (state: RootState) =>
  state.cart.shippingAddress;
export const selectPaymentMethod = (state: RootState) =>
  state.cart.paymentMethod;

export const cartReducer = cartSlice.reducer;
