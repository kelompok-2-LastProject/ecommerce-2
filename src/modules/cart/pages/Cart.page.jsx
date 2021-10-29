import { NextSeo } from 'next-seo';
import { Container, Table, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import { cartSelector } from '../../shared/redux/slices/cart';
import { theme } from '../../shared/config/constants';

const CartPage = () => {
  /* #region MAIN */
  const cart = useSelector(cartSelector);
  const totalPrice = useMemo(() => {
    return cart.values.reduce(
      (accumulator, curr) => accumulator + curr.price * curr.quantity,
      0,
    );
  }, [cart.values]);

  const onMinus = () => {
    // TODO:
  };

  const onPlus = () => {
    // TODO:
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
                  <tr key={product.id} className="align-middle">
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
                    <td className="d-flex align-items-center">
                      <p style={{ marginTop: '15px' }}>{product.quantity}</p>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ padding: '4px 8px', margin: '0 10px' }}
                        onClick={() => onMinus()}
                      >
                        -
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ padding: '4px 8px' }}
                        onClick={() => onPlus()}
                      >
                        +
                      </Button>
                    </td>
                    <td>$ {product.price * product.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ fontWeight: 'bolder', fontSize: 20 }}>
                  <th colSpan="4">Total Price</th>
                  <th>$ {totalPrice}</th>
                </tr>
              </tfoot>
            </Table>
          )}

          <Button
            variant="primary"
            size="lg"
            className="mt-5"
            onClick={onCheckout}
          >
            Checkout
          </Button>
        </Container>
      </main>

      {/* footer */}
      <MyFooter />
    </div>
  );
};

export default CartPage;
