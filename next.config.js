const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/shops",
        destination: "/",
        permanent: true,
      },
      {
        source: "/test",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: { domains: ["images.unsplash.com"] },
};

module.exports = nextConfig;
