/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://images.ctfassets.net/**'),
      new URL('https://mdg.imgix.net/**'),
    ],
  },
};

export default nextConfig;
