import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com", "upload.wikimedia.org"], // Allow listed domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/diujpbja7/image/upload/**", // Allows only your Cloudinary account images
      },
    ],
  },
};

export default nextConfig;
