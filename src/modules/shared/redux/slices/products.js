import { createSlice } from '@reduxjs/toolkit';
// files
import generateNumberFromInterval from '../../utils/generateNumberFromInterval';

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
        product.quantity = generateNumberFromInterval(5, 100);

        return product;
      });

      state.count = newProducts.length;
      state.values = newProducts;
    },
    updateProductsBasedOnCart: (state, action) => {
      // action.payload === Product[] (updated)
      action.payload.forEach((updatedProduct) => {
        state.values = state.values.map((product) => {
          if (product.id === updatedProduct.id) {
            product = updatedProduct;
          }

          return product;
        });
      });
    },
  },
});

// products selector
export const productsSelector = (state) => state.products;

// products actions
export const { addInitialProducts, updateProductsBasedOnCart } =
  productsSlice.actions;

// products reducer
export default productsSlice.reducer;
