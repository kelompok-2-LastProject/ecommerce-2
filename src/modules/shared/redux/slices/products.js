import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    count: 0,
    values: [],
  },
  reducers: {
    addInitialProducts: (state, action) => {
      // action.payload === Product[]
      const newProducts = action.payload.map((product) => {
        product.quantity = +(Math.random() * 100).toFixed();

        return product;
      });

      state.count = newProducts.length;
      state.values = newProducts;
    },
  },
});

// products selector
export const productsSelector = (state) => state.products;

// products actions
export const { addInitialProducts } = productsSlice.actions;

// products reducer
export default productsSlice.reducer;
