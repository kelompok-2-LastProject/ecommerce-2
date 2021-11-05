// import libraries
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import NProgress from 'nprogress';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';

// import styles
import '../modules/shared/styles/globals.css';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import files
import store from '../modules/shared/redux/store';
import SEO from '../modules/shared/config/seo';

// create a custom progress bar
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />

      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </>
  );
}

export default MyApp;
