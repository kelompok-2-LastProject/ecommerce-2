import { NextSeo } from 'next-seo';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Container, Table, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { theme } from '../../../shared/config/constants';
import MyNavbar from '../../../shared/components/MyNavbar';
import MyFooter from '../../../shared/components/MyFooter';
import { ADMIN_TOKEN } from '../../../shared/config/constants';
import Loader from '../../../shared/components/Loader';
import { checkoutSelector } from '../../../shared/redux/slices/checkout';

export default function SalesRecapPage() {
  const recap = useSelector(checkoutSelector);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token !== ADMIN_TOKEN) {
        await router.push('/login'); // push to login page
        toast.error('You are not authenticated!');
        return;
      }
      setIsReady(true);
    })();
  }, []);

  const totalPrice = useMemo(() => {
    return recap.values.reduce(
      (accumulator, curr) => accumulator + curr.price * curr.quantity,
      0,
    );
  }, [recap.values]);

  return (
    <div className="sales-recap">
      <NextSeo title="SalesRecap" />
      {isReady ? (
        <>
          <MyNavbar />
          <main className="sales-recap-container min-vh-100">
            <Container fluid="lg" s>
              <h1 className="my-5">Sales Recap</h1>
              {recap.count < 1 ? (
                <p>No products sold yet</p>
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
                      <th>Price</th>
                      <th>Sold</th>
                      <th>Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recap.values.map((product) => (
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
                          <div className="mt-2 d-flex justify-content-start align-items-center w-100">
                            <p className="px-2 py-1 text-white rounded bg-secondary">
                              {product.category}
                            </p>
                          </div>
                        </td>
                        <td>$ {product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                          {' '}
                          $ {(product.price * product.quantity).toFixed()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ fontWeight: 'bolder', fontSize: 20 }}>
                      <th colSpan="4">Total: </th>
                      <th>$ {totalPrice.toFixed()}</th>
                    </tr>
                  </tfoot>
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
