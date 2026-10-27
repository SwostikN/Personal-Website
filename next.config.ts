import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One canonical host for search engines: www → bare domain.
  async redirects() {
    return [
      { source: "/work/nagrik-nepal", destination: "/work/road-development-app", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.swostikn.com.np" }],
        destination: "https://swostikn.com.np/:path*",
        permanent: true,
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
