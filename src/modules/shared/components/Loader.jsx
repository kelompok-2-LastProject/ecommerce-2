import { Row, Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Row className="m-auto min-vh-100">
      <Spinner className="m-auto" animation="border" variant="primary" />
    </Row>
  );
};

export default Loader;
