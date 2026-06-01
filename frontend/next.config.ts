import type { NextConfig } from "next";

const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000";
const remotePatterns: any[] = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
];

try {
  const parsed = new URL(payloadUrl);
  remotePatterns.push({
    protocol: parsed.protocol.replace(":", ""),
    hostname: parsed.hostname,
    ...(parsed.port ? { port: parsed.port } : {}),
  });
} catch (e) {
  // Ignore
}

// Always whitelist localhost/127.0.0.1 on port 4000 for local dev
if (!remotePatterns.some(p => p.hostname === 'localhost')) {
  remotePatterns.push({
    protocol: 'http',
    hostname: 'localhost',
    port: '4000',
  });
}
if (!remotePatterns.some(p => p.hostname === '127.0.0.1')) {
  remotePatterns.push({
    protocol: 'http',
    hostname: '127.0.0.1',
    port: '4000',
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
