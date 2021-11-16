import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../../modules/admin/products/pages/SalesRecap.page'),
  {
    ssr: false,
  },
);

export default DynamicComponentWithNoSSR;
