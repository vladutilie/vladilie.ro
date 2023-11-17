/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.gr-assets.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'cf.geekdo-images.com' },
      { protocol: 'https', hostname: 'gcdahtftlmucxetygvev.supabase.co' },
      { protocol: 'https', hostname: 'gravatar.com' },
      { protocol: 'https', hostname: 'unavatar.io' }
    ]
  }
};

module.exports = withContentlayer(withNextIntl(nextConfig));
