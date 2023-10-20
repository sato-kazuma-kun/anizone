/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = ({
  images: {
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3300',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
});
