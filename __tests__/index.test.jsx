import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor } from '../src/utils/test-util';
import '@testing-library/jest-dom';
// files
import HomePage from '../src/pages/index.js';
import { PRODUCTS } from '../src/mocks/product.js';

const server = setupServer(
  rest.get('https://fakestoreapi.com/products', (_req, res, ctx) => {
    return res(ctx.json(PRODUCTS));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('HomePage', () => {
  it('should renders the heading', () => {
    render(<HomePage />);

    expect(screen.getByText(/products list/i)).toBeInTheDocument();
  });

  // it('should loads and renders products list', async () => {
  //   render(<HomePage />);

  //   await waitFor(() => screen.getByTestId('product-card-0'));
  //   await waitFor(() => screen.getByTestId('product-card-img-0'));
  //   await waitFor(() => screen.getByTestId('product-card-title-0'));

  //   expect(screen.getByTestId('product-card-0')).toBeInTheDocument();
  //   expect(screen.getByTestId('product-card-img-0')).toBeInTheDocument();
  //   expect(screen.getByTestId('product-card-title-0')).toBeInTheDocument();
  // });

  // it('should handles sort-by-price click button event', async () => {
  //   render(<HomePage />);

  //   await waitFor(() => screen.getByTestId('dropdown-sort-by'));
  //   fireEvent.click(screen.getByTestId('dropdown-sort-by'));
  //   fireEvent.click(screen.getByTestId('dropdown-sort-by-price'));

  //   expect(screen.getByTestId('product-card-0')).toBeInTheDocument();
  //   expect(screen.getByTestId('product-card-title-0')).toHaveTextContent(
  //     'Women',
  //   );
  // });
});
