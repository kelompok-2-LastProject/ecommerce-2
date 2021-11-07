import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Container, Table, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { theme } from '../../../shared/config/constants';
import { getProducts } from '../../../shared/services/products';
import MyNavbar from '../../../shared/components/MyNavbar';
import MyFooter from '../../../shared/components/MyFooter';
import { ADMIN_TOKEN } from '../../../shared/config/constants';
import Loader from '../../../shared/components/Loader';
import {
  productsSelector,
  addInitialProducts,
  updateProduct,
} from '../../../shared/redux/slices/products';

export default function UpdateProductPage() {
  /* #region CHECK IF ADMIN */
  const { push } = useRouter();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token !== ADMIN_TOKEN) {
        await push('/login'); // push to login page
        toast.error('You are not authenticated!');
        return;
      }
      setIsReady(true);
    })();
  }, [push]);
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

  /* #region MAIN */
  const [tempProducts, setTempProducts] = useState([]);

  useEffect(() => {
    if (products.count > 0) setTempProducts(products.values);
  }, [products.count, products.values]);

  function onChangeInput(productId, newQuantity) {
    setTempProducts((prev) => {
      const newState = [...prev].map((prod) => {
        if (prod.id === productId) {
          const newObject = {
            ...prod,
            quantity: +newQuantity,
          };

          return newObject;
        } else {
          return prod;
        }
      });

      return newState;
    });
  }

  function onClickUpdate(productId) {
    const updatedProduct = tempProducts.find((elem) => elem.id === productId);

    if (updatedProduct.quantity < 0) {
      toast.error('Can not go below 0');
      return;
    }

    dispatch(updateProduct(updatedProduct));
    toast.success('Product updated');
  }
  /* #endregion */

  return (
    <div className="update-product">
      <NextSeo title="UpdateProduct" />
      {isReady ? (
        <>
          <MyNavbar />

          <main className="update-product-container">
            <Container fluid="sm md lg my-5 pb-5">
              <h1 className="my-5">Update Product</h1>
              {tempProducts.length < 1 ? (
                <Loader />
              ) : (
                <Table striped hover>
                  <thead
                    style={{
                      backgroundColor: theme.colors.grey,
                      fontWeight: 50,
                      fontSize: 20,
                    }}
                  >
                    <tr>
                      <th colSpan="2">Product</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tempProducts.map((product) => (
                      <tr key={product.id} className="align-middle">
                        <td style={{ textAlign: 'center' }}>
                          <Image
                            alt={product.title}
                            src={product.image}
                            width={90}
                            height={100}
                          />
                        </td>
                        <td>
                          <h5>{product.title}</h5>
                          <p>${product.price}</p>
                          <span className="fst-italic text-secondary w-75">
                            {product.description}
                            <div className="mt-2 d-flex justify-content-start align-items-center w-100">
                              <p className="px-2 py-1 text-white rounded bg-secondary">
                                {product.category}
                              </p>
                            </div>
                          </span>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            min={0}
                            value={product.quantity}
                            onChange={(e) =>
                              onChangeInput(product.id, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Button
                            className="my-5"
                            variant="primary"
                            type="button"
                            onClick={() => onClickUpdate(product.id)}
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Container>
          </main>
          <MyFooter />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
