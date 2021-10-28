import axios from 'axios';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import MyNavbar from '../../shared/components/MyNavbar';
import MyFooter from '../../shared/components/MyFooter';
import { ADMIN_TOKEN } from '../../shared/config/constants';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/users/2`).then((res) => {
      const persons = res.data;
      setUser(persons);
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //untuk login user
    //username = mor_2314
    //password = 83r5^_
    if (username === user.username && password === user.password) {
      const res = await axios.post('https://fakestoreapi.com/auth/login', {
        username: user.username,
        password: user.password,
      });
      const token = res.data.token;
      localStorage.setItem('token', token);
      router.push('/');
    }
    //untuk login admin
    //username = admin@bukapedia.com
    //password = admin123
    else if (username === 'admin@bukapedia.com' && password === 'admin123') {
      localStorage.setItem('token', ADMIN_TOKEN);
      router.push('/admin/products');
    } else {
      toast.error('Wrong Username/Email or Password!');
      setUserName('');
      setPassword('');
    }
  };
  return (
    <div className="login">
      <NextSeo title="Login" />
      {/* navbar */}
      <MyNavbar />

      <main className="my-5 login-container">
        <Container fluid="lg">
          <h1 className="my-5">Login to your account</h1>

          <Form className="" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username/Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username/email"
                style={{ width: '50%' }}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
              />
            </Form.Group>

            <Button className="my-5" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </main>

      {/* footer */}
      <MyFooter />
    </div>
  );
}
