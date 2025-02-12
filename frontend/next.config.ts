import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["images.unsplash.com", "upload.wikimedia.org"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
};

export default nextConfig;
