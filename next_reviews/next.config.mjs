///** @type {import('next').NextConfig} */
//export default {
  //output: 'export',
//};
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nextConfig = {
  images: {domains: ['localhost']},
  webpack: (config) => {
    config.resolve.alias['@lib'] = `${__dirname}/app/lib`;
    return config;
  },
};
export default nextConfig;