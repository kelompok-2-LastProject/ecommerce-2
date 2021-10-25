import { NextSeo } from 'next-seo';
import { Button } from 'react-bootstrap';
// files
import MyNavbar from '../../shared/components/MyNavbar';

export default function HomePage() {
  return (
    <div className="home">
      <NextSeo title="Home" />

      <main className="home-container">
        {/* navbar */}
        <MyNavbar />
        <h1 className="">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}
