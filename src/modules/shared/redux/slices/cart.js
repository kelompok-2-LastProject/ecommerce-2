import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
    values: [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      // action.payload === Product
      state.values = [...state.values, action.payload];
    },
    updateProductFromCart: (state, action) => {
      // action.payload === Product
      state.values = state.values.map((productCart) => {
        if (productCart.id === action.payload.id) {
          productCart = action.payload;
        }

        return productCart;
      });
    },
    deleteProductsFromCart: (state, action) => {
      // action.payload === product.id[]
      action.payload.forEach((productId) => {
        state.values = state.values.filter(
          (productCart) => productCart.id !== productId,
        );
      });
    },
  },
});

// cart selector
export const cartSelector = (state) => state.cart;

// cart actions
export const {
  addProductToCart,
  updateProductFromCart,
  deleteProductsFromCart,
} = cartSlice.actions;

// cart reducer
export default cartSlice.reducer;
