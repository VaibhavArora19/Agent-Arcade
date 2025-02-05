import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: "/:path*",
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
