module.exports = {
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/products',
        destination: '/',
      },
    ];
  },
};
