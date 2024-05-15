/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
