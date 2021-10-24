import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
    values: [],
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library.
  reducers: {},
});

// cart selector
export const cartSelector = (state) => state.cart.values;

// cart actions
export const { addProductToCart, deleteProductFromCart } = cartSlice.actions;

// cart reducer
export default cartSlice.reducer;
