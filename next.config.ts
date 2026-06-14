import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stable CSS chunk paths in dev; avoids stale layout.css 404 loops after cache wipes
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable persistent disk cache in dev (fixes corrupt layout.css on Windows)
      config.cache = false;
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
