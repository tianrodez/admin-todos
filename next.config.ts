import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  watchOptions: {
    pollIntervalMs: 1000,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
