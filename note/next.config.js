/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products/deleted_forever", // 여기로 들어오면
        destination: "/products", // 여기로 보내줌
        permanent: true, // 308 영원히 이동됐으므로 캐시 가능
      },
      {
        source: "/products/deleted_temp", // 여기로 들어오면
        destination: "/products", // 여기로 보내줌
        permanent: false, // 307 임시로 이동됐으므로 캐시 불가능
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/tony", // 여기로 들어오면
        destination: "/about/me/tony", // 여기로 보내줌
      },
      {
        source: "/items/:slug", // 여기로 들어오면
        destination: "/products/:slug", // 여기로 보내줌
      },
    ];
  },
};

module.exports = nextConfig;
