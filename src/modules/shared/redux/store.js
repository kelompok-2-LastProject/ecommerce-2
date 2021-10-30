import { configureStore } from '@reduxjs/toolkit';
// files
import cartReducer from './slices/cart';
import productsReducer from './slices/products';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
