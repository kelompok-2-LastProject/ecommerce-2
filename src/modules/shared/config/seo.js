const defaultSeoProps = {
  titleTemplate: 'fe:male - %s',
  defaultTitle: 'fe:male',
  description: 'We are the best selling e-commerce online store out there!',
  // canonical: 'https://trishop.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    site_name: 'fe:male',
    // url: 'https://trishop.vercel.app/',
    title: 'fe:male',
    description: 'We are the best selling e-commerce online store out there!',
    // images: [
    //   {
    //     url: 'https://trishop.vercel.app/images/trishop.png',
    //     width: 800,
    //     height: 600,
    //     alt: 'Trishop Logo Image',
    //   },
    // ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'minimum-scale=1, initial-scale=1, width=device-width',
    },
  ],
};

export default defaultSeoProps;
