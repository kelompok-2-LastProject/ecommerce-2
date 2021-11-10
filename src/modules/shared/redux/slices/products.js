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
    sortProducts: (state, action) => {
      // action.payload === 'quantity' || 'price'
      state.values = state.values.sort(
        (a, b) => a[action.payload] - b[action.payload],
      );
    },
    updateProduct: (state, action) => {
      // action.payload === Product
      const updatedProducts = state.values.map((val) => {
        if (val.id === action.payload.id) {
          val.quantity = action.payload.quantity;
        }
        return val;
      });
      state.values = updatedProducts;
    },
  },
});

// products selector
export const productsSelector = (state) => state.products;

// products actions
export const {
  addInitialProducts,
  updateProductsBasedOnCart,
  sortProducts,
  filterProducts,
  updateProduct,
} = productsSlice.actions;

// products reducer
export default productsSlice.reducer;
