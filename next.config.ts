import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.109", "192.168.1.109:3000", '*.ngrok-free.app',],
};

export default nextConfig;
