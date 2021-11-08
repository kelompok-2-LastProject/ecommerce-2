import Link from 'next/link';

const Custom404 = () => {
  return (
    <div
      className="flex-row d-flex align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="text-center col-md-12">
            <span className="display-1 d-block">404</span>

            <div className="mb-4 lead">
              The page you are looking for was not found.
            </div>

            <Link href="/">
              <a className="btn btn-primary">Back to Home</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
