import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Dropdown,
} from 'react-bootstrap';
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
  sortProducts,
  productsSelector,
} from '../../shared/redux/slices/products';
import useDebounce from '../../shared/hooks/useDebounce';

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

  /* #region GET PRODUCTS DATA */
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

  /* #region SEARCH PRODUCT */
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     setIsSearching(true);
  //     searchCharacters(debouncedSearchTerm).then((results) => {
  //       setIsSearching(false);
  //       setResults(results);
  //     });
  //   }
  // }, [debouncedSearchTerm]);
  /* #endregion */

  /* #region SORT PRODUCT */
  const [selectedSortOption, setSelectedSortOption] = useState('default');
  const onClickSort = (selectedOption) => {
    dispatch(sortProducts(selectedOption));
    setSelectedSortOption(selectedOption);
  };
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
                <section>
                  {/* search and sort */}
                  <div className="mt-5 d-flex justify-content-between align-items-center">
                    <Form className="d-flex flex-column justify-content-start w-25">
                      <InputGroup className="">
                        <Form.Control
                          type="search"
                          placeholder="Search product..."
                          aria-label="Search product"
                          aria-describedby="search-term"
                          style={{ width: '50%%' }}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" id="search-button">
                          Search
                        </Button>
                      </InputGroup>
                    </Form>

                    <Dropdown className="d-flex justify-content-end">
                      <Dropdown.Toggle id="dropdown-autoclose-true">
                        Sort by
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          active={selectedSortOption === 'quantity'}
                          onClick={() => onClickSort('quantity')}
                        >
                          Quantity
                        </Dropdown.Item>
                        <Dropdown.Item
                          active={selectedSortOption === 'price'}
                          onClick={() => onClickSort('price')}
                        >
                          Price
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

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

                          {product.quantity === 0 ? (
                            <Card.Footer className="px-5 py-4 text-white bg-danger">
                              <strong>SOLD OUT</strong>
                            </Card.Footer>
                          ) : (
                            <Card.Footer className="px-5 py-4">
                              <strong>Price: ${product.price}</strong>
                              <br />
                              <strong>Quantity: {product.quantity}</strong>
                            </Card.Footer>
                          )}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </section>
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
