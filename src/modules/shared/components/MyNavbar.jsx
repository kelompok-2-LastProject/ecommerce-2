import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
// files
import { ADMIN_TOKEN, theme, USER_TOKEN } from '../config/constants';

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
  /* #region CHECK IF LOGGED IN */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    (() => {
      const token = localStorage.getItem('token');

      if (token === USER_TOKEN) {
        setIsLoggedIn(true);
        setIsUser(true);
      } else if (token === ADMIN_TOKEN) {
        setIsLoggedIn(true);
        setIsAdmin(true);
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, []);
  /* #endregion */

  /* #region MAIN */
  const { push, pathname } = useRouter();

  const onLogin = async () => {
    await push('/login');
  };

  const onLogout = async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    await push('/');
  };
  /* #endregion */

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
            className="mx-3 my-2 me-auto my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link href="/" passHref>
              <Nav.Link style={styles.navLink}>Home</Nav.Link>
            </Link>
            {isUser && (
              <Link href="/cart" passHref>
                <Nav.Link style={styles.navLink}>Cart</Nav.Link>
              </Link>
            )}
            <Link href="/faq" passHref>
              <Nav.Link style={styles.navLink}>FAQ</Nav.Link>
            </Link>
            <Link href="/support" passHref>
              <Nav.Link style={styles.navLink}>Support</Nav.Link>
            </Link>
            {isAdmin && (
              <Link href="/admin/sales" passHref>
                <Nav.Link style={styles.navLink}>Sales Recap</Nav.Link>
              </Link>
            )}
          </Nav>

          {pathname !== '/login' && (
            <div className="d-flex">
              {isLoggedIn ? (
                <Button variant="danger" onClick={onLogout}>
                  Logout
                </Button>
              ) : (
                <Button variant="primary" onClick={onLogin}>
                  Login
                </Button>
              )}
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
