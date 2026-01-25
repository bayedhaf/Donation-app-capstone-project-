import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use remotePatterns to avoid wildcard host vulnerabilities
    remotePatterns: [
      {
        protocol: "https",
        hostname: "capstone-api-dwzu.onrender.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
      // Add additional trusted hosts here
    ],
  },
};

export default nextConfig;
