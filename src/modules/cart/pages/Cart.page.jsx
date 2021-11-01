import { NextSeo } from 'next-seo';
import { Container, Table, Image, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import Loader from '../../shared/components/Loader';
import {
  cartSelector,
  updateProductFromCart,
  clearCart,
  deleteProductsFromCart,
} from '../../shared/redux/slices/cart';
import {
  productsSelector,
  updateProductsBasedOnCart,
} from '../../shared/redux/slices/products';
import { addOrUpdateProductsFromCartToCheckout } from '../../shared/redux/slices/checkout';
import { ADMIN_TOKEN, theme } from '../../shared/config/constants';

const CartPage = () => {
  /* #region CHECK IF LOGGED IN AS USER */
  const { push } = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token === ADMIN_TOKEN) {
        toast.warn('Please login as user');
        await push('/admin/products');
        return;
      } else if (!token) {
        toast.warn('Please login first');
        await push('/login');
        return;
      }

      setIsReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  /* #region BULK DELETE */
  const [productCheck, setProductCheck] = useState([]); // [{ productId: 1, isChecked: true }]
  const atLeastOneProductChecked = productCheck.find((prod) => prod?.isChecked);

  const onBulkDelete = () => {
    const payload = productCheck.map((el) => el?.isChecked && el?.productId);
    dispatch(deleteProductsFromCart(payload));
    setProductCheck([]);
  };
  /* #endregion */

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
    let filteredProductsBasedOnCart = [];
    cart.values.forEach((cartItem) => {
      // get productItem from products === productItem from Cart
      const productItem = products.values.find(
        (prod) => prod.id === cartItem.id,
      );

      // substract product.quantity from products based on productRedux.quantity
      // productItem.quantity data from products
      const updatedProductItem = {
        ...productItem,
        quantity: productItem.quantity - cartItem.quantity,
      };

      // push to filteredProductsBasedOnCart array
      filteredProductsBasedOnCart.push(updatedProductItem);
    });

    // add cart to checkout || update quantity products from checkout
    dispatch(addOrUpdateProductsFromCartToCheckout(cart.values));

    // update product.quantity from products
    dispatch(updateProductsBasedOnCart(filteredProductsBasedOnCart));

    // delete all cart
    dispatch(clearCart());

    // on success all
    toast.success('Thank you!');
  };
  /* #endregion */

  return (
    <div className="cart">
      <NextSeo title="Cart" />

      {isReady ? (
        <>
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
                        <th>
                          {/* <Form.Check
                            type="checkbox"
                            aria-label="check-all"
                            checked={allCheck}
                            onChange={(e) => setAllCheck(e.target.checked)}
                          /> */}
                          #
                        </th>
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
                            <Form.Check
                              className="pe-auto"
                              type="checkbox"
                              aria-label={`check-${product.id}`}
                              checked={
                                productCheck[product.id - 1]?.isChecked || false
                              }
                              onChange={(e) =>
                                setProductCheck((prev) => {
                                  const nextValue = [...prev];
                                  nextValue[product.id - 1] = {
                                    productId: product.id,
                                    isChecked: e.target.checked,
                                  };

                                  return nextValue;
                                })
                              }
                            />
                          </td>
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
                                style={{
                                  padding: '2px 8px',
                                  marginRight: '10px',
                                }}
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
                                style={{
                                  padding: '2px 8px',
                                  marginLeft: '10px',
                                }}
                                onClick={() => onPlus(product)}
                              >
                                +
                              </Button>
                            </Form>
                          </td>
                          <td>
                            $ {(product.price * product.quantity).toFixed()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ fontWeight: 'bolder', fontSize: 20 }}>
                        <th colSpan="5">Total Price</th>
                        <th>$ {totalPrice.toFixed()}</th>
                      </tr>
                      {atLeastOneProductChecked && (
                        <tr>
                          <th colSpan="5" className="fst-italic text-secondary">
                            Delete selected product from cart?
                          </th>
                          <th>
                            <Button
                              variant="danger"
                              size="sm"
                              style={{
                                padding: '2px 8px',
                              }}
                              onClick={onBulkDelete}
                            >
                              YES
                            </Button>
                          </th>
                        </tr>
                      )}
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
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CartPage;
