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
};

module.exports = nextConfig;
