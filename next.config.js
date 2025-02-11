/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect until we have more information about how we want token checks to work
  // eslint-disable-next-line require-await
  async redirects() {
    return [
      {
        source: '/',
        destination: '/seller',
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
