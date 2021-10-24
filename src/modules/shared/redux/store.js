import { configureStore } from '@reduxjs/toolkit';
// files
import cartReducer from './slices/cart';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productsApi.middleware, usersApi.middleware), // require('redux-logger')
});

export default store;
