import { Row, Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Row className="mx-auto min-vh-100">
      <Spinner className="mt-5" animation="border" variant="primary" />
    </Row>
  );
};

export default Loader;
