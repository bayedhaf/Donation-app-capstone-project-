import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add image hostnames used by your API responses
    domains: [
      "example.com",
      // Add real API image hosts here, e.g., "cdn.yourapi.com"
    ],
  },
};

export default nextConfig;
