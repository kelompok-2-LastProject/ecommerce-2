import Link from 'next/link';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
// files
import { theme } from '../config/constants';

const styles = {
  myFooter: {
    backgroundColor: theme.colors.primary,
  },
  iconColor: {
    color: theme.colors.white,
  },
  copyright: {
    paddingBottom: '2.5rem',
  },
};

const MyFooter = () => {
  return (
    <footer className="w-auto h-auto" style={styles.myFooter}>
      <Container fluid="lg" className="">
        <Row
          lg={3}
          className="p-2 g-4 justify-content-between align-items-center"
        >
          <Col className="text-end">
            <Link href="/faq">
              <a className="text-white text-decoration-none">FAQ</a>
            </Link>
          </Col>
          <Col className="text-center">
            <Link href="/" passHref>
              <Image
                className="rounded-circle"
                alt="logo"
                src="/female.png"
                width="40"
                height="40"
              />
            </Link>
          </Col>
          <Col className="text-start">
            <Link href="/support">
              <a className="text-white text-decoration-none">Support</a>
            </Link>
          </Col>
        </Row>

        <hr className="pt-1 text-white" />

        <Row className="py-4 mx-auto w-25 justify-content-center align-items-center">
          <Col className="text-center">
            <Link href="https://github.com/rifandani">
              <a>
                <FaGithub role="button" className="text-white fs-2" />
              </a>
            </Link>
          </Col>
          <Col className="text-center">
            <Link href="https://github.com/verara15">
              <a>
                <FaGithub role="button" className="text-danger fs-2" />
              </a>
            </Link>
          </Col>
        </Row>

        <Row className="pt-2 mx-auto" style={styles.copyright}>
          <p className="text-center text-white fs-5">
            © Team 2, {new Date().getFullYear()}. We love our project.
          </p>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
