/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript:{
ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.pixabay.com',
      'p16-amd-va.tiktokcdn.com',
      'image.shutterstock.com'
    ],
  },
};

module.exports = nextConfig;
