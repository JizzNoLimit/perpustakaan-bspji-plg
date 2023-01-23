/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SERVER:'http://localhost:8080/api/v1',
    TOKEN_SECRET:'fsdfedfsmdfjehrsdfrvadfsd',
    SERVER:'http://localhost:8080'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/cover/*',
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
