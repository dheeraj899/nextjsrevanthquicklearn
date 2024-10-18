import path from 'path';

const nextConfig = {
  output: 'export',
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
