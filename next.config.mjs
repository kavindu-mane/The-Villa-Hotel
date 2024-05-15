/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
