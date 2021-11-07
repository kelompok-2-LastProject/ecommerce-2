import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Dropdown,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import Loader from '../../shared/components/Loader';
import MyPagination from '../../shared/components/MyPagination';
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

  /* #region SORT PRODUCTS */
  const [selectedSortOption, setSelectedSortOption] = useState('default');
  const onClickSort = (selectedOption) => {
    dispatch(sortProducts(selectedOption));
    setSelectedSortOption(selectedOption);
  };
  /* #endregion */

  /* #region SEARCH PRODUCTS */
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.values.length > 0) {
      setFilteredProducts(products.values);
    }
  }, [products.values]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);

      // filter products based on searchTerm
      setFilteredProducts(
        products.values.filter(
          (prod) =>
            prod.title
              .toLowerCase()
              .indexOf(debouncedSearchTerm.toLowerCase()) > -1 ||
            prod.description
              .toLowerCase()
              .indexOf(debouncedSearchTerm.toLowerCase()) > -1,
        ),
      );

      setSelectedSortOption('default');
      setIsSearching(false);
    } else {
      setFilteredProducts(products.values);
      setIsSearching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);
  /* #endregion */

  /* #region PAGINATION PRODUCTS */
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const paginatedProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredProducts?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, filteredProducts]);
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
                  <div className="mt-5 d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center align-items-start">
                    <Form className="d-flex flex-column justify-content-start w-50">
                      <InputGroup className="">
                        <InputGroup.Text id="search-term">
                          Search
                        </InputGroup.Text>
                        <Form.Control
                          type="search"
                          placeholder="Product title or description..."
                          aria-label="Search product"
                          aria-describedby="search-term"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                    {filteredProducts.length === 0 ? (
                      <Col>
                        <h1>No product found</h1>
                      </Col>
                    ) : (
                      paginatedProducts?.map((product) => (
                        <Col key={product.id}>
                          <Card>
                            <Card.Img
                              className="p-5"
                              variant="top"
                              src={product.image}
                              height="300"
                              width="300"
                            />

                            <Card.Body className="px-5">
                              <Row>
                                <Link href={`/products/${product.id}`}>
                                  <a className="fw-bolder text-decoration-none text-truncate">
                                    {product.title}
                                  </a>
                                </Link>
                              </Row>
                            </Card.Body>

                            {product.quantity === 0 ? (
                              <Card.Footer className="px-5 py-4 text-white bg-danger fw-bolder">
                                <strong>SOLD OUT</strong>
                              </Card.Footer>
                            ) : (
                              <ListGroup variant="flush">
                                <ListGroupItem className="px-5">
                                  Price:{' '}
                                  <p className="text-success d-inline fw-bolder">
                                    ${product.price}
                                  </p>
                                </ListGroupItem>
                                <ListGroupItem className="px-5">
                                  Quantity:{' '}
                                  <p className="text-success d-inline fw-bolder">
                                    {product.quantity}
                                  </p>
                                </ListGroupItem>
                              </ListGroup>
                            )}
                          </Card>
                        </Col>
                      ))
                    )}
                  </Row>

                  <MyPagination
                    className="my-5"
                    currentPage={currentPage}
                    totalCount={filteredProducts?.length}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
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
