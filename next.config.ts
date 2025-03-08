import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/earn",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/trustwallet/assets/**",
      },
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
        pathname: "/coins/images/**",
      },
      {
        protocol: "https",
        hostname: "app.euler.finance",
        port: "",
        pathname: "/tokens/**",
      },
      {
        protocol: "https",
        hostname: "cdn.morpho.org",
        port: "",
        pathname: "/*/assets/**",
      },
      {
        protocol: "https",
        hostname: "api.whisk.so",
        port: "",
        pathname: "/static/img/**",
      },
    ],
  },
};

export default nextConfig;
