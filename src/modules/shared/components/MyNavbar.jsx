import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
// files
import useLocalStorage from '../hooks/useLocalStorage';
import { theme } from '../config/constants';

const styles = {
  navLinkFirst: {
    color: theme.colors.white,
    marginRight: '1rem',
  },
  navLink: {
    color: theme.colors.white,
    marginRight: '1rem',
  },
};

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
    <Navbar expand="md" style={{ backgroundColor: theme.colors.primary }}>
      <Container fluid="lg">
        <Link href="/cart" passHref>
          <Image
            className="rounded-circle"
            alt="logo"
            src="/logo-dark.png"
            width="40"
            height="40"
          />
        </Link>

        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ backgroundColor: theme.colors.white }}
        />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 mx-3 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link href="/" passHref>
              <Nav.Link style={styles.navLink}>Home</Nav.Link>
            </Link>
            <Link href="/faq" passHref>
              <Nav.Link style={styles.navLink}>FAQ</Nav.Link>
            </Link>
            <Link href="/support" passHref>
              <Nav.Link style={styles.navLink}>Support</Nav.Link>
            </Link>
          </Nav>

          <div className="d-flex">{memoizedButton}</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
