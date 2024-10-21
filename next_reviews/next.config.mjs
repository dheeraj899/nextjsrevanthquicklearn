import path from 'path';
const nextConfig = {
  //output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'http',  // Use 'https' in production
        hostname: 'localhost',
        port: '1337',      // Port used by your image server, e.g., Strapi
        pathname: '/uploads/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lib': path.resolve('./app/lib'),
      '@content': path.resolve('./app/content'),
    };
    return config;
  },
};
export default nextConfig;