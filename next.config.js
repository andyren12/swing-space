/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URI: "http://localhost:3001/",
    NEXTAUTH_SECRET: "%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQe",
    NEXTAUTH_URL: "http://localhost:3000/",
  },
};

module.exports = nextConfig;
