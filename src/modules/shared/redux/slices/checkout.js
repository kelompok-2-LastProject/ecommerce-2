import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    count: 0,
    values: [],
  },
  reducers: {
    addOrUpdateProductsFromCartToCheckout: (state, action) => {
      // action.payload === Product[] from cart
      let newCheckout = [...state.values];
      action.payload.forEach((productCart) => {
        // find same product
        const sameProductFromCheckout = state.values.find(
          (checkoutItem) => checkoutItem.id === productCart.id,
        );

        // if there is no same product
        if (!sameProductFromCheckout) {
          newCheckout.push(productCart);
          return;
        }

        // if there is same/existing product
        newCheckout = newCheckout.map((checkoutItem) => {
          if (checkoutItem.id === sameProductFromCheckout.id) {
            checkoutItem.quantity += productCart.quantity;
          }

          return checkoutItem;
        });
      });

      state.values = newCheckout;
      state.count = state.values.length;
    },
  },
});

// checkout selector
export const checkoutSelector = (state) => state.checkout;

// checkout actions
export const { addOrUpdateProductsFromCartToCheckout } = checkoutSlice.actions;

// checkout reducer
export default checkoutSlice.reducer;
