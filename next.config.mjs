import path from 'node:path';
import CopyPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://images.ctfassets.net/**'),
      new URL('https://mdg.imgix.net/**'),
    ],
  },
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({ patterns: [ { from: path.join('projects'), to: path.join('projects') } ] }),
    );
    return config;
  },
};

export default nextConfig;
