import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../../modules/product/pages/ProductDetail.page'),
  {
    ssr: false,
  },
);

export default DynamicComponentWithNoSSR;
