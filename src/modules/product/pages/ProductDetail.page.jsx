import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Container, Row, Col, Image, Spinner, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import { getProduct } from '../../shared/services/products';

export default function ProductDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const splittedURL = window.location.pathname.split('/');
  const productId = splittedURL[splittedURL.length - 1];

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

  return (
    <div className="home">
      <NextSeo title="Product" />

      {/* navbar */}
      <MyNavbar />

      <main className="home-container">
        <Container fluid="lg">
          <h1 className="my-5">Product Detail</h1>

          {isLoading && (
            <Row className="min-vh-100 min-vw-100 justify-content-center align-items-center">
              <Spinner animation="border" variant="primary" />
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
                      {product?.rating?.rate} {`(${product?.rating?.count})`}
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
                <Button variant="primary">Add to cart</Button>
              </Col>
            </Row>
          )}
        </Container>
      </main>

      <MyFooter />
    </div>
  );
}
