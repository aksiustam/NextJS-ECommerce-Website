/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: "build",
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
