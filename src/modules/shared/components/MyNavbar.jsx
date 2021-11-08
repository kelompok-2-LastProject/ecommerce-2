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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    (() => {
      const token = localStorage.getItem('token');

      if (token === USER_TOKEN) {
        setIsUser(true);
        setIsAdmin(false);
      } else if (token === ADMIN_TOKEN) {
        setIsAdmin(true);
        setIsUser(false);
      } else {
        setIsUser(false);
        setIsAdmin(false);
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
    setIsUser(false);
    setIsAdmin(false);
    await push('/');
  };
  /* #endregion */

  return (
    <Navbar
      expand="md"
      style={{ backgroundColor: theme.colors.primary }}
      sticky="top"
    >
      <Container fluid="lg">
        <Link href="/cart" passHref>
          <Image
            className="rounded-circle"
            alt="logo"
            src="/female.png"
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
            {!isAdmin && (
              <Link href="/" passHref>
                <Nav.Link style={styles.navLink}>Home</Nav.Link>
              </Link>
            )}
            {isUser && (
              <Link href="/cart" passHref>
                <Nav.Link style={styles.navLink}>Cart</Nav.Link>
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin/products" passHref>
                <Nav.Link style={styles.navLink}>Update Product</Nav.Link>
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin/sales" passHref>
                <Nav.Link style={styles.navLink}>Sales Recap</Nav.Link>
              </Link>
            )}
          </Nav>

          {pathname !== '/login' && (
            <div className="d-flex">
              {isUser || isAdmin ? (
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
