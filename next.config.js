/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["openweathermap.org"]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
