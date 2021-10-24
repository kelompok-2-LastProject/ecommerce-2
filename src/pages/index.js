import { Button } from 'react-bootstrap';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
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
