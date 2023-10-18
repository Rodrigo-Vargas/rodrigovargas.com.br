const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  async rewrites() {
    return [
      {
        source: '/blog/:path*', destination: '/:path*'
      }
    ]
  }
};

module.exports = withContentlayer(nextConfig)

