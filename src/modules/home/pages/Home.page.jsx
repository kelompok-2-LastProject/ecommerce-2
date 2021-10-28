import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import truncateText from '../../shared/utils/truncateText';
import { getProducts } from '../../shared/services/products';
import { ADMIN_TOKEN } from '../../shared/config/constants';

export default function HomePage() {
  /* #region CHECK IF LOGGED IN AS ADMIN */
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token === ADMIN_TOKEN) {
        await push('/admin/products'); // push to update products
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  /* #region MAIN */
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status, data } = await getProducts();

      // check API call status
      if (status !== 200) {
        toast.error('Error getting products list!');
        return;
      }

      setProducts(data);
    })();
  }, []);

  const onDetail = async (productId) => {
    await push(`/products/${productId}`);
  };

  const onAddToCart = async () => {
    // if not logged in
    if (!token) {
      toast.warn('Please login first');
      await push('/login');
      return;
    }

    // TODO: add to REDUX cart
  };
  /* #endregion */

  return (
    <div className="home">
      <NextSeo title="Home" />

      {/* navbar */}
      <MyNavbar />

      <main className="pb-5 home-container">
        <Container fluid="lg">
          <h1 className="my-5">Products List</h1>

          <h6 className="">Berikut produk kami</h6>

          <Row xs={1} sm={2} lg={3} xxl={4} className="my-5 g-4">
            {products?.map((product) => (
              <Col key={product.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    height="300"
                    width="300"
                  />

                  <Card.Body className="p-5">
                    <Card.Title className="fw-bolder">
                      {truncateText(product.title)}
                    </Card.Title>
                    <Card.Text className="fw-lighter">
                      {truncateText(product.description)}
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer className="px-5 py-4 d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => onDetail(product.id)}
                    >
                      Detail
                    </Button>
                    <Button variant="primary" onClick={onAddToCart}>
                      Add to cart
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      <MyFooter />
    </div>
  );
}
