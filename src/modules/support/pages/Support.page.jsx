import { NextSeo } from 'next-seo';
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
} from 'react-bootstrap';
import { FaHome, FaPhone, FaMailBulk } from 'react-icons/fa';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';

const SupportPage = () => {
  return (
    <div className="support">
      <NextSeo title="Support" />

      {/* navbar */}
      <MyNavbar />

      <main className="support-container min-vh-100">
        <Container fluid="lg">
          <h1 className="my-5">Support</h1>

          <h6 className="mb-5">
            Jika ada masukan ataupun pertanyaan, silahkan mengisi form berikut
          </h6>

          <Row className="mb-4 g-4">
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Nama">
                <Form.Control
                  className="bg-light"
                  type="text"
                  placeholder="Input nama"
                />
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Email">
                <Form.Control
                  className="bg-light"
                  type="email"
                  placeholder="Input email"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <FloatingLabel controlId="floatingInputGrid" label="Description">
            <Form.Control
              className="bg-light"
              as="textarea"
              placeholder="Input description"
              style={{ height: '200px' }}
            />
          </FloatingLabel>

          <section className="my-4 d-grid">
            <Button variant="primary" size="lg">
              Submit
            </Button>
          </section>

          <section className="d-flex g-4 justify-content-evenly align-items-center">
            <div className="d-flex align-items-center">
              <FaHome className="text-primary" />
              <p
                className="ml-2 fw-light"
                style={{ marginTop: '1rem', marginLeft: '1rem' }}
              >
                Jalan Mangga Dua
              </p>
            </div>

            <div className="d-flex align-items-center">
              <FaPhone className="text-primary" />
              <p
                className="ml-2 fw-light"
                style={{ marginTop: '1rem', marginLeft: '1rem' }}
              >
                +62-812-4193-9353
              </p>
            </div>

            <div className="d-flex align-items-center">
              <FaMailBulk className="text-primary" />
              <p
                className="ml-2 fw-light"
                style={{ marginTop: '1rem', marginLeft: '1rem' }}
              >
                support@female.com
              </p>
            </div>
          </section>
        </Container>
      </main>

      {/* footer */}
      <MyFooter />
    </div>
  );
};

export default SupportPage;
