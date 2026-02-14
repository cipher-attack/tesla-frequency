/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false, // ይህ ፕሮሰሱ እንዳይገደል ያደርገዋል
    cpus: 1
  },
  reactStrictMode: false,
  swcMinify: false
};

module.exports = nextConfig;

