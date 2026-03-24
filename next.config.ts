import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Existing empty config
  // Add custom webpack to provide browser polyfills for node modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure fallback object exists
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        // Provide encoding polyfill (installed via npm)
        encoding: require.resolve("encoding")
      };
    }
    return config;
  }
};

export default nextConfig;
