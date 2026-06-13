import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    // Avoid corrupted persistent webpack cache on Windows (especially paths with spaces).
    // A bad cache causes missing chunk files and endless 404s for layout.css in dev.
    if (dev) {
      config.cache = { type: "memory" };
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        encoding: require.resolve("encoding"),
      };
    }

    return config;
  },
};

export default nextConfig;
