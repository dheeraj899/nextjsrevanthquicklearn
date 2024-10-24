import path from 'path';

const toRemotePattern = (urlString) => {
  const url = new URL(urlString);
  return {
    protocol: url.protocol.replace(':', ''), // Remove the colon
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
};

const nextConfig = {
  // output: 'export',
  images: {
    remotePatterns: [
      toRemotePattern(process.env.CMS_IMAGE_PATTERN || 'http://localhost:1337/uploads/**'), // Fallback to a default value
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
