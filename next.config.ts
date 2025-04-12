import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // to display images from auth providers
  images: {
    domains: ["avatars.githubusercontent.com"],
  }
};

export default nextConfig;
