import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import cartReducer from '../modules/shared/redux/slices/cart';
import productsReducer from '../modules/shared/redux/slices/products';
import checkoutReducer from '../modules/shared/redux/slices/checkout';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        cart: cartReducer,
        products: productsReducer,
        checkout: checkoutReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
