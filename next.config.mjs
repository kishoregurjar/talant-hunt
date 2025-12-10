/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   images: {
    domains: ["images.unsplash.com"], // ✅ allow unsplash images
  },
  swcMinify: false,

};

export default nextConfig;
