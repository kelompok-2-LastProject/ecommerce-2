import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import Loader from '../../shared/components/Loader';
import truncateText from '../../shared/utils/truncateText';
import { ADMIN_TOKEN } from '../../shared/config/constants';
import { getProducts } from '../../shared/services/products';
import {
  addInitialProducts,
  productsSelector,
} from '../../shared/redux/slices/products';

export default function HomePage() {
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
  const products = useSelector(productsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // check if products is already exists
      if (products.count > 0) {
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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  return (
    <div className="home">
      <NextSeo title="Home" />

      {isReady ? (
        <>
          {/* navbar */}
          <MyNavbar />

          <main className="pb-5 home-container">
            <Container fluid="lg">
              <h1 className="my-5">Products List</h1>

              <h6 className="">
                fe:male memiliki banyak pilihan produk dari banyak kategori,
                mulai dari pakaian pria, pakaian wanita, perhiasan, dan
                elektronik.
              </h6>

              {products.count === 0 ? (
                <Loader />
              ) : (
                <Row xs={1} sm={2} lg={3} xxl={4} className="my-5 g-4">
                  {products.values.map((product) => (
                    <Col key={product.id}>
                      <Card>
                        <Card.Img
                          className="p-5"
                          variant="top"
                          src={product.image}
                          height="300"
                          width="300"
                        />

                        <Card.Body className="p-5">
                          <Link href={`/products/${product.id}`}>
                            <a className="fw-bolder text-decoration-none">
                              {truncateText(product.title)}
                            </a>
                          </Link>
                          <Card.Text className="mt-2 fw-lighter fst-italic">
                            {truncateText(product.description)}
                          </Card.Text>
                        </Card.Body>

                        <Card.Footer className="px-5 py-4">
                          <strong>Quantity: {product.quantity}</strong>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
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
