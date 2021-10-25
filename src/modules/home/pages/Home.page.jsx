import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import truncateText from '../../shared/utils/truncateText';
import { getProducts } from '../services/products';

export default function HomePage() {
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

  return (
    <div className="home">
      <NextSeo title="Home" />

      <main className="home-container">
        {/* navbar */}
        <MyNavbar />

        <Container fluid="lg">
          <h1 className="my-5">Products List</h1>

          <h6 className="my-5">Berikut produk kami</h6>

          <Row xs={1} sm={2} lg={3} xxl={4} className="g-4">
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
                    <Button variant="secondary">Detail</Button>
                    <Button variant="primary">Add to cart</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </div>
  );
}
