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
import { ADMIN_TOKEN } from '../../shared/config/constants';
import { getProducts } from '../../shared/services/products';
import {
  addInitialProducts,
  productsSelector,
} from '../../shared/redux/slices/products';
import { addProductToCart } from '../../shared/redux/slices/cart';

export default function ProductDetailPage() {
  /* #region CHECK IF LOGGED IN AS ADMIN */
  const { push } = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token === ADMIN_TOKEN) {
        await push('/admin/products'); // push to update products
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

  /* #region MAIN */
  const [inputQuantity, setInputQuantity] = useState('1');

  const onChangeQuantity = (e) => {
    // TODO: check from product.quantity, if greater than it, then disable button

    setInputQuantity(e.target.value);
  };

  const onAddToCart = async () => {
    const token = localStorage.getItem('token');

    // if not logged in
    if (token && !token.startsWith('eyJh')) {
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
        quantity: inputQuantity,
      }),
    );
    toast.info('Product added to cart');
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
                    <Form className="mt-2 d-flex flex-column justify-content-start w-100">
                      <Form.Group className="">
                        <Form.Label>Input quantity: </Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          max={product?.quantity}
                          style={{ width: '25%' }}
                          value={inputQuantity}
                          onChange={onChangeQuantity}
                        />
                      </Form.Group>

                      <Button
                        className="mt-2"
                        style={{ width: '25%' }}
                        variant="primary"
                        onClick={onAddToCart}
                      >
                        Add to cart
                      </Button>
                    </Form>
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
