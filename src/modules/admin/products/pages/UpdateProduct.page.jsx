import axios from 'axios';
import { NextSeo } from 'next-seo';
import { Container, Table } from 'react-bootstrap';

import MyNavbar from '../../../shared/components/MyNavbar';
import MyFooter from '../../../shared/components/MyFooter';

export default function UpdateProductPage() {
  return (
    <main>
      <NextSeo title="UpdateProduct" />
      {/* navbar */}
      <MyNavbar />
      <Container fluid="lg my-5 pb-5 pt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <MyFooter />
    </main>
  );
}
