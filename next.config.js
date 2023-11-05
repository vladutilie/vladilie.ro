/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {  protocol: 'https', hostname: 'i.gr-assets.com' },
      {  protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      {  protocol: 'https', hostname: 'cf.geekdo-images.com' },
      {  protocol: 'https', hostname: 'gcdahtftlmucxetygvev.supabase.co' },
      {  protocol: 'https', hostname: 'gravatar.com' },
      {  protocol: 'https', hostname: 'unavatar.io' },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

module.exports = withContentlayer(nextConfig);
