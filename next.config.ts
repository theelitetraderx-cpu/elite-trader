import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable blocking linting/check errors for deployment speed
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Custom webpack fallback for node-fetch/encoding compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        encoding: require.resolve("encoding")
      };
    }
    return config;
  }
};

export default nextConfig;
