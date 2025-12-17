import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.mobilemasr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets-dubaiphone.dubaiphone.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [
    "localhost:5000",
    "127.0.0.1:5000",
    "*.replit.dev",
    "*.replit.app",
    "*.janeway.replit.dev"
  ],
};

export default nextConfig;
