import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*", // This is the route in your Next.js app
                destination: "http://localhost:8080/api/:path*", // Replace with your backend's URL
            },
        ];
    },
};

export default nextConfig;
