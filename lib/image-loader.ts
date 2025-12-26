/**
 * Custom image loader that allows images from any URL on the internet
 * This bypasses Next.js remotePatterns restrictions
 */
export default function imageLoader({ src, width, quality }: { quality?: number; src: string; width: number }) {
    // If it's already a full URL, return it as-is
    if (src.startsWith("http://") || src.startsWith("https://")) {
        return src;
    }

    // Otherwise, return the src (for local images)
    return src;
}
