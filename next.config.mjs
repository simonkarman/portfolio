/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://images.ctfassets.net/**'),
    ],
  },
};

export default nextConfig;
