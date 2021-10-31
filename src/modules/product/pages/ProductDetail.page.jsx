import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import Loader from '../../shared/components/Loader';
import { ADMIN_TOKEN, USER_TOKEN } from '../../shared/config/constants';
import { getProducts } from '../../shared/services/products';
import {
  addInitialProducts,
  productsSelector,
} from '../../shared/redux/slices/products';
import {
  addProductToCart,
  cartSelector,
  updateProductFromCart,
} from '../../shared/redux/slices/cart';

export default function ProductDetailPage() {
  /* #region CHECK IF LOGGED IN AS GUEST OR USER */
  const { push } = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token === ADMIN_TOKEN) {
        toast.warn('You are already logged in as admin');
        await push('/admin/products');
        return;
      }

      setIsReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  /* #region GET PRODUCT DATA */
  const products = useSelector(productsSelector);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  // get product.id from URL path
  const productId = useMemo(() => {
    const splittedURL = window.location.pathname.split('/');
    const productId = splittedURL[splittedURL.length - 1];

    return productId;
  }, []);

  useEffect(() => {
    (async () => {
      // check if products is already exists
      if (products.count > 0) {
        // find product using productId from redux
        const productFound = products.values.find(
          (prod) => prod.id === +productId,
        );
        setProduct(productFound);
        return;
      }

      // get products from API
      const { status, data } = await getProducts();

      // check API call status
      if (status !== 200) {
        toast.error('Error getting products list!');
        return;
      }

      // add products to redux
      dispatch(addInitialProducts(data));

      // find product using productId from redux
      const productFound2 = data.find((prod) => prod.id === +productId);
      setProduct(productFound2);
      // setInputQuantity(productFound2.quantity);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  /* #region CHECK IF PRODUCT ALREADY IN CART */
  const cart = useSelector(cartSelector);
  const [isExistingProductFromCart, setIsExistingProductFromCart] =
    useState(false);

  useEffect(() => {
    (() => {
      const existingProductFromCart = cart.values.find(
        (cartItem) => cartItem.id === +productId,
      );

      if (existingProductFromCart) {
        setInputQuantity(`${existingProductFromCart.quantity}`);
        setIsExistingProductFromCart(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  /* #region MAIN */
  const isSoldOut = useMemo(() => product?.quantity === 0, [product]);
  const [inputQuantity, setInputQuantity] = useState('1');

  const onChangeQuantity = (e) => {
    setInputQuantity(e.target.value);
  };

  const onAddToCart = async () => {
    const token = localStorage.getItem('token');

    // if not logged in as USER
    if (token !== USER_TOKEN) {
      toast.warn('Please login first');
      await push('/login');
      return;
    }

    // when manually inputted -> check if it's less than 1 || more than product.quantity
    if (inputQuantity < 1) {
      toast.warn('Input quantity cannot be less than 1');
      return;
    } else if (inputQuantity > product?.quantity) {
      toast.warn(`Input quantity cannot be more than ${product?.quantity}`);
      return;
    }

    // add to REDUX cart
    dispatch(
      addProductToCart({
        ...product,
        quantity: +inputQuantity,
      }),
    );
    toast.info('Product added to cart');
  };

  const onUpdateCart = async () => {
    // when manually inputted -> check if it's less than 1 || more than product.quantity
    if (inputQuantity < 1) {
      toast.warn('Input quantity cannot be less than 1');
      return;
    } else if (inputQuantity > product?.quantity) {
      toast.warn(`Input quantity cannot be more than ${product?.quantity}`);
      return;
    }

    // update REDUX cart
    dispatch(
      updateProductFromCart({
        ...product,
        quantity: +inputQuantity,
      }),
    );
    toast.info('Cart updated');
  };

  /* #endregion */

  return (
    <div className="product-detail">
      <NextSeo title={product?.title} />

      {isReady ? (
        <>
          {/* navbar */}
          <MyNavbar />

          <main className="home-container">
            <Container fluid="lg">
              <h1 className="my-5">Product Detail</h1>

              {product === null ? (
                <Loader />
              ) : (
                <Row className="min-vh-100 min-vw-100">
                  <Col xs={4}>
                    <Image
                      className="rounded"
                      alt={product?.title}
                      src={product?.image}
                      width="90%"
                      height="70%"
                    />
                  </Col>

                  <Col xs={8}>
                    {/* title */}
                    <h1 className="mb-2 fs-5 fw-bolder">{product?.title}</h1>

                    {/* price + quantity + rating */}
                    <div className="d-flex justify-content-start align-items-center w-100">
                      <p className="">Price: ${product?.price}</p>
                      <p className="mx-5">Quantity: {product?.quantity}</p>
                      <div className="d-flex">
                        <FaStar className="mt-1 text-warning " />
                        <p style={{ marginLeft: '1rem' }}>
                          {product?.rating?.rate}{' '}
                          {`(${product?.rating?.count})`}
                        </p>
                      </div>
                    </div>

                    {/* category */}
                    <div className="mt-2 d-flex justify-content-start align-items-center w-100">
                      <p className="px-2 py-1 text-white rounded bg-secondary">
                        {product?.category}
                      </p>
                    </div>

                    {/* desc */}
                    <p className="my-5 fst-italic text-secondary w-75">
                      {product?.description}
                    </p>

                    {/* add to cart / update cart */}
                    {isSoldOut ? (
                      <div className="mt-2 d-flex justify-content-start align-items-center w-100">
                        <p className="px-2 py-1 text-white rounded bg-danger">
                          SOLD OUT
                        </p>
                      </div>
                    ) : (
                      <Form className="mt-2 d-flex flex-column justify-content-start w-100">
                        <Form.Group className="">
                          <Form.Label>Input quantity: </Form.Label>
                          <Form.Control
                            type="number"
                            min={1}
                            max={product?.quantity}
                            style={{ width: '15%' }}
                            value={inputQuantity}
                            onChange={onChangeQuantity}
                            disabled={isSoldOut}
                          />
                        </Form.Group>

                        {isExistingProductFromCart ? (
                          <Button
                            className="mt-2"
                            style={{ width: '15%' }}
                            variant="warning"
                            onClick={onUpdateCart}
                            disabled={isSoldOut}
                          >
                            Update cart
                          </Button>
                        ) : (
                          <Button
                            className="mt-2"
                            style={{ width: '15%' }}
                            variant="primary"
                            onClick={onAddToCart}
                            disabled={isSoldOut}
                          >
                            Add to cart
                          </Button>
                        )}
                      </Form>
                    )}
                  </Col>
                </Row>
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
}
