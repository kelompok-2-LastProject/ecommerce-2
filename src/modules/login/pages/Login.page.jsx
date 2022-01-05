import axios from 'axios';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
// files
import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import Loader from '../../shared/components/Loader';
import { ADMIN_TOKEN, USER_TOKEN } from '../../shared/config/constants';

export default function LoginPage() {
  /* #region CHECK IF NOT LOGGED IN */
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');

      if (token === USER_TOKEN) {
        toast.warn('You are already logged in as user');
        await router.push('/');
        return;
      } else if (token === ADMIN_TOKEN) {
        toast.warn('You are already logged in as admin');
        await router.push('/admin/products');
        return;
      }

      setIsReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  /* #region MAIN */
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/users/2`).then((res) => {
      const person = res.data;
      setUser(person);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === user.username && password === user.password) {
      //untuk login user
      //username = mor_2314
      //password = 83r5^_
      const res = await axios.post('https://fakestoreapi.com/auth/login', {
        username: user.username,
        password: user.password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      await router.push('/');
    } else if (username === 'admin@bukapedia.com' && password === 'admin123') {
      //untuk login admin
      //username = admin@bukapedia.com
      //password = admin123
      localStorage.setItem('token', ADMIN_TOKEN);
      await router.push('/admin/products');
    } else {
      toast.error('Wrong Username/Email or Password!');
      setUserName('');
      setPassword('');
    }
  };
  /* #endregion */

  return (
    <div className="login">
      <NextSeo title="Login" />

      {isReady ? (
        <>
          {/* navbar */}
          <MyNavbar />

          <main className="my-5 login-container">
            <Container fluid="lg">
              <h1 className="my-5" data-testid="login-title">
                Login to your account
              </h1>

              <Form className="" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username/Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username/email"
                    style={{ width: '50%' }}
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    data-testid="login-email"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    style={{ width: '50%' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid="login-password"
                  />
                </Form.Group>

                <Button
                  className="my-5"
                  variant="primary"
                  type="submit"
                  data-testid="login-button"
                >
                  Submit
                </Button>
              </Form>
            </Container>
          </main>

          {/* footer */}
          <MyFooter />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
