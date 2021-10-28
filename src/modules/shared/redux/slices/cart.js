import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
    values: [],
  },
  reducers: {},
});

// cart selector
export const cartSelector = (state) => state.cart.values;

// cart actions
export const { addProductToCart } = cartSlice.actions;

// cart reducer
export default cartSlice.reducer;
