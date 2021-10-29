import { NextSeo } from 'next-seo';
import { Container } from 'react-bootstrap';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import { FAQs } from '../mocks';

const FAQPage = () => {
  return (
    <div className="cart">
      <NextSeo title="Cart" />

      {/* navbar */}
      <MyNavbar />

      <main className="cart-container min-vh-100">
        <Container fluid="lg">
          <h1 className="my-5">Frequently Asked Questions (FAQ)</h1>

          <h6 className="mb-5">
            Pertanyaan yang sering ditanyakan di toko kami
          </h6>

          <section className="flex-wrap d-flex">
            {FAQs.map((faq) => (
              <div key={faq.id} className="py-2 w-100">
                <details className="mb-4">
                  <summary className="px-4 py-2 text-white rounded bg-secondary fw-bold">
                    {faq.q}
                  </summary>

                  <p className="px-4 py-2 bg-light">{faq.a}</p>
                </details>
              </div>
            ))}
          </section>
        </Container>
      </main>

      {/* footer */}
      <MyFooter />
    </div>
  );
};

export default FAQPage;
