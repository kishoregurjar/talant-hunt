/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    unoptimized: true
  },
  experimental: {
    swcWorker:1
  }
};

export default nextConfig;
