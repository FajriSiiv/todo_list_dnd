/** @type {import('next').NextConfig} */
// const nextConfig = {};
import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Nonaktifkan di mode development
});

export default config;
