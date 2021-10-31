import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { theme } from '../../../shared/config/constants';
import { getProducts } from '../../../shared/services/products';
import { Container, Table, Image, Button } from 'react-bootstrap';

import MyNavbar from '../../../shared/components/MyNavbar';
import MyFooter from '../../../shared/components/MyFooter';

export default function UpdateProductPage() {
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
    <main>
      <NextSeo title="UpdateProduct" />
      {/* navbar */}
      <MyNavbar />
      <Container fluid="lg my-5 pb-5">
        <h1 className="my-5">Update Product</h1>
        {products.count < 1 ? (
          <h6 className="mb-5">Empty Product</h6>
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
                <th>Product</th>
                <th>Detail</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
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
                    <p className="fst-italic text-secondary w-75">
                      {product.description}
                      <div className="mt-2 d-flex justify-content-start align-items-center w-100">
                        <p className="px-2 py-1 text-white rounded bg-secondary">
                          {product.category}
                        </p>
                      </div>
                    </p>
                  </td>
                  <td>
                    <input type="number" className="form-control" />
                  </td>
                  <td>
                    <Button className="my-5" variant="primary" type="button">
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <MyFooter />
    </main>
  );
}
