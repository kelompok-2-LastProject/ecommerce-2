import { configureStore } from '@reduxjs/toolkit';
// files
import cartReducer from './slices/cart';
import productsReducer from './slices/products';
import checkoutReducer from './slices/checkout';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    checkout: checkoutReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
