/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/enigma-escape-games',
  assetPrefix: '/enigma-escape-games/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
