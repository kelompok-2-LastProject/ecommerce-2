import { configureStore } from '@reduxjs/toolkit';
// files
import cartReducer from './slices/cart';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
