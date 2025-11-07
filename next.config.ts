import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname),
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true
};

export default nextConfig;
