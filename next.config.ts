import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // to display images from auth providers
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  }
};

export default nextConfig;
