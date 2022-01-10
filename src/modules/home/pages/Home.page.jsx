import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState, useMemo, useRef } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import Loader from '../../shared/components/Loader';
import MyPagination from '../../shared/components/MyPagination';
import { ADMIN_TOKEN } from '../../shared/config/constants';
import { getProducts } from '../../shared/services/products';
import {
  addInitialProducts,
  productsSelector,
} from '../../shared/redux/slices/products';
import useDebounce from '../../shared/hooks/useDebounce';

export default function HomePage() {
  /* #region CHECK IF LOGGED IN AS ADMIN */
  const { query, push } = useRouter();
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
      const searchedProducts = products.values.filter(
        (prod) =>
          prod.title.toLowerCase().indexOf(debouncedSearchTerm.toLowerCase()) >
            -1 ||
          prod.description
            .toLowerCase()
            .indexOf(debouncedSearchTerm.toLowerCase()) > -1,
      );

      setFilteredProducts(searchedProducts);
      setIsSearching(false);
      push('/');
    } else {
      setFilteredProducts(products.values);
      setIsSearching(false);
      push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);
  /* #endregion */

  /* #region SORT & FILTER PRODUCTS */
  const notEmpty = filteredProducts.length > 0;
  const sortOptions = ['price', 'quantity'];
  const filterOptions = [
    'All Category',
    ...new Set(products.values.map((prod) => prod.category)),
  ];

  const onClickSort = async (selectedSort) => {
    await push({
      query: {
        category: query.category || '',
        sort: selectedSort,
      },
    });
  };
  const onClickFilter = async (selectedFilter) => {
    await push({
      query: {
        category: selectedFilter,
      },
    });
  };

  useEffect(() => {
    if (query.sort) {
      const sortedProducts = filteredProducts
        .slice()
        .sort((a, b) => a[query.sort] - b[query.sort]);

      setFilteredProducts(sortedProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.sort, notEmpty]);

  useEffect(() => {
    if (query.category) {
      if (query.category === 'All Category') {
        setFilteredProducts(products.values);
      } else {
        const categorizedProducts = products.values.filter(
          (prod) => prod.category === query.category,
        );

        setFilteredProducts(categorizedProducts);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.category, notEmpty]);
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
            <div className="mb-5" style={{ width: '100%' }}>
              <Carousel>
                <Carousel.Item interval={1500}>
                  <img
                    className="d-block w-100"
                    src="/banner1.jpg"
                    alt="Image One"
                  />
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                  <img
                    className="d-block w-100"
                    src="banner2.jpg"
                    alt="Image Two"
                  />
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                  <img
                    className="d-block w-100"
                    src="banner3.jpg"
                    alt="Image Three"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <Container fluid="lg">
              <h1 className="my-5" data-testid="home-heading">
                Products List
              </h1>

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

                    {/* filter category */}
                    <div className="d-flex gap-5">
                      <Dropdown className="d-flex justify-content-end">
                        <Dropdown.Toggle
                          id="dropdown-autoclose-true"
                          data-testid="dropdown-filter-by"
                        >
                          Filter By
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {filterOptions.map((filterOption) => (
                            <Dropdown.Item
                              key={filterOption}
                              active={query.category === filterOption}
                              onClick={() => onClickFilter(filterOption)}
                              data-testid={`dropdown-filter-by-${
                                filterOption.charAt(0) + filterOption.slice(1)
                              }`}
                            >
                              {filterOption.charAt(0).toUpperCase() +
                                filterOption.slice(1)}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>

                      {/* sort */}
                      <Dropdown className="d-flex justify-content-end">
                        <Dropdown.Toggle
                          id="dropdown-autoclose-true"
                          data-testid="dropdown-sort-by"
                        >
                          Sort By
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {sortOptions.map((sortOption) => (
                            <Dropdown.Item
                              key={sortOption}
                              active={query.sort === sortOption}
                              onClick={() => onClickSort(sortOption)}
                              data-testid={`dropdown-sort-by-${
                                sortOption.charAt(0) + sortOption.slice(1)
                              }`}
                            >
                              {sortOption.charAt(0).toUpperCase() +
                                sortOption.slice(1)}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  <Row xs={1} sm={2} lg={3} xxl={4} className="my-5 g-4">
                    {filteredProducts.length === 0 ? (
                      <Col>
                        <h1>No product found</h1>
                      </Col>
                    ) : (
                      paginatedProducts?.map((product, idx) => (
                        <Col key={product.id}>
                          <Card data-testid={`product-card-${idx}`}>
                            <Card.Img
                              className="p-5"
                              variant="top"
                              src={product.image}
                              height="300"
                              width="300"
                              data-testid={`product-card-img-${idx}`}
                            />

                            <Card.Body className="px-5">
                              <Row>
                                <Link href={`/products/${product.id}`}>
                                  <a
                                    className="fw-bolder text-decoration-none text-truncate"
                                    data-testid={`product-card-title-${idx}`}
                                  >
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
