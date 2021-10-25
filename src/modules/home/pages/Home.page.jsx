import Head from 'next/head';
import { Button } from 'react-bootstrap';
// files
import MyNavbar from '../../shared/components/MyNavbar';

export default function HomePage() {
  return (
    <div className="home">
      <Head>
        <title>fe:male - Home</title>
      </Head>

      <main className="home-container">
        {/* navbar */}
        <MyNavbar />
        <h1 className="">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Button variant="primary">Primary</Button>{' '}
        <Button variant="secondary">Secondary</Button>{' '}
        <Button variant="success">Success</Button>{' '}
      </main>
    </div>
  );
}
