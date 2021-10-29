import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Container, Row, Col, Image, Spinner, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import Loader from '../../shared/components/Loader';
import { getProduct } from '../../shared/services/products';
import { ADMIN_TOKEN } from '../../shared/config/constants';

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

  /* #region MAIN */
  const productId = useMemo(() => {
    const splittedURL = window.location.pathname.split('/');
    const productId = splittedURL[splittedURL.length - 1];

    return productId;
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const { status, data } = await getProduct(productId);

      // check API call status
      if (status !== 200) {
        toast.error('Error getting product detail!');
        return;
      }

      setIsLoading(false);
      setProduct(data);
    })();
  }, [productId]);

  const onAddToCart = async () => {
    const token = localStorage.getItem('token');

    // if not logged in
    if (!token.startsWith('eyJh')) {
      toast.warn('Please login first');
      await push('/login');
      return;
    }

    // TODO: add to REDUX cart
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

              {isLoading && (
                <Row className="mx-auto min-vh-100">
                  <Spinner
                    className="mt-5"
                    animation="border"
                    variant="primary"
                  />
                </Row>
              )}

              {product && (
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
                      <p className="mx-5">Quantity: HARD_CODED</p>
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

                    {/* add to cart */}
                    <Button variant="primary" onClick={onAddToCart}>
                      Add to cart
                    </Button>
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
