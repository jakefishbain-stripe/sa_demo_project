module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/shop',
        permanent: true,
      }
    ]
  },
}
