import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        deviceSizes: [320, 420, 640, 768, 1024, 1280, 1600, 1920],
        formats: ["image/avif", "image/webp"],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        loader: "custom",
        loaderFile: "./lib/image-loader.ts",
        minimumCacheTTL: 60,
        // Custom loader allows any URL - no remotePatterns restriction needed
    },
    reactStrictMode: true,
};

export default nextConfig;
