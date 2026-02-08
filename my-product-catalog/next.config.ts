const nextConfig: import("next").NextConfig = {
  images: {
    domains: ["fakestoreapi.com", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};

module.exports = nextConfig;
