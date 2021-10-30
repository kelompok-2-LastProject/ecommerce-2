import { NextSeo } from 'next-seo';
import { Container, Table, Image, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import {
  cartSelector,
  updateProductFromCart,
} from '../../shared/redux/slices/cart';
import { productsSelector } from '../../shared/redux/slices/products';
import { theme } from '../../shared/config/constants';

const CartPage = () => {
  /* #region MAIN */
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const products = useSelector(productsSelector);
  const totalPrice = useMemo(() => {
    return cart.values.reduce(
      (accumulator, curr) => accumulator + curr.price * curr.quantity,
      0,
    );
  }, [cart.values]);

  const onMinus = (product) => {
    // check if product.quantity reached minimum
    if (product.quantity <= 1) {
      toast.warn('can not go below 1');
      return;
    }

    dispatch(
      updateProductFromCart({
        ...product,
        quantity: product.quantity - 1,
      }),
    );
  };

  const onPlus = (product) => {
    // check if product.quantity reached maximum
    const productRedux = products.values.find((prod) => prod.id === product.id);
    if (product.quantity >= productRedux.quantity) {
      toast.warn(`can not go above ${productRedux.quantity}`);
      return;
    }

    dispatch(
      updateProductFromCart({
        ...product,
        quantity: product.quantity + 1,
      }),
    );
  };

  const onCheckout = () => {
    // TODO:
  };
  /* #endregion */

  return (
    <div className="cart">
      <NextSeo title="Cart" />

      {/* navbar */}
      <MyNavbar />

      <main className="cart-container min-vh-100">
        <Container fluid="lg">
          <h1 className="my-5">Your Cart</h1>

          {cart.count < 1 ? (
            <h6 className="mb-5">Empty cart</h6>
          ) : (
            <>
              <Table striped hover>
                <thead
                  style={{
                    backgroundColor: theme.colors.grey,
                    fontWeight: 50,
                    fontSize: 20,
                  }}
                >
                  <tr>
                    <th colSpan="2">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.values.map((product) => (
                    <tr key={product.title} className="align-middle">
                      <td>
                        <Image
                          alt={product.title}
                          src={product.image}
                          width={30}
                          height={40}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>$ {product.price}</td>
                      <td className="">
                        <Form className="d-flex align-items-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            style={{ padding: '2px 8px', marginRight: '10px' }}
                            onClick={() => onMinus(product)}
                          >
                            -
                          </Button>

                          <p style={{ marginTop: '15px' }}>
                            {product.quantity}
                          </p>

                          {/* <Form.Group className="">
                            <Form.Control
                              type="number"
                              min={1}
                              max={product.quantity}
                              style={{ width: '25%' }}
                              value={inputQuantity}
                              onChange={onChangeQuantity}
                            />
                          </Form.Group> */}

                          <Button
                            variant="primary"
                            size="sm"
                            style={{ padding: '2px 8px', marginLeft: '10px' }}
                            onClick={() => onPlus(product)}
                          >
                            +
                          </Button>
                        </Form>
                      </td>
                      <td>$ {(product.price * product.quantity).toFixed()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ fontWeight: 'bolder', fontSize: 20 }}>
                    <th colSpan="4">Total Price</th>
                    <th>$ {totalPrice.toFixed()}</th>
                  </tr>
                </tfoot>
              </Table>

              <Button
                variant="primary"
                size="lg"
                className="mt-5"
                onClick={onCheckout}
              >
                Checkout
              </Button>
            </>
          )}
        </Container>
      </main>

      {/* footer */}
      <MyFooter />
    </div>
  );
};

export default CartPage;
