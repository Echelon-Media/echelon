/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "out",
  cacheHandler: process.env.NODE_ENV === 'production' ? require.resolve('./cache-handler.mjs') : undefined,
  experimental: {
    // This is required for the experimental feature of pre-populating the cache with the initial data
    instrumentationHook: true,
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,

  async redirects() {
    return [
      {
        source: "/ne100/:path*",
        destination: "https://ne100.echelon.lk/:path*",
        permanent: true,
      },
      {
        source: "/the-people",
        destination: "/about-us",
        permanent: false,
      },
    ];
  },
};
