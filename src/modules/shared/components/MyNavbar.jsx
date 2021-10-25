import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
// files
import useLocalStorage from '../hooks/useLocalStorage';
import { theme } from '../config/constants';

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const { push } = useRouter();

  const onLogin = async () => {
    await push('/login');
  };

  const onLogout = async () => {
    setIsLoggedIn(false);
    await push('/');
  };

  const memoizedButton = useMemo(
    () =>
      isLoggedIn ? (
        <Button variant="danger" onClick={onLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="primary" onClick={onLogin}>
          Login
        </Button>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn],
  );

  return (
    <Navbar expand="lg" style={{ backgroundColor: theme.colors.primary }}>
      <Container fluid>
        <Link href="/cart" passHref>
          <Image alt="logo" src="/logo-dark.png" width="40" height="20" />
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link href="/" passHref>
              <Nav.Link className="ml-4" style={{ color: theme.colors.white }}>
                Home
              </Nav.Link>
            </Link>
            <Link href="/faq" passHref>
              <Nav.Link style={{ color: theme.colors.white }}>FAQ</Nav.Link>
            </Link>
            <Link href="/support" passHref>
              <Nav.Link style={{ color: theme.colors.white }}>Support</Nav.Link>
            </Link>
          </Nav>

          <div className="d-flex">{memoizedButton}</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
