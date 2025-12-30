/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/enigma-escape-games',
  assetPrefix: '/enigma-escape-games/',
  images: {
    unoptimized: true,
  },
  // Optimize for performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Reduce bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            chunks: 'all',
            priority: 2,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
