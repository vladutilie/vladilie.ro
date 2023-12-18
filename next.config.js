/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    remotePatterns: [
      { protocol: 'https', hostname: 'i.gr-assets.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'cf.geekdo-images.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'gravatar.com' }
    ]
  },
  redirects() {
    return [
      {
        source: '/ro/case-studies/wordpress-plugin-woocommerce-custom-paintings',
        destination: '/en/projects/wordpress-plugin-woocommerce-custom-paintings',
        permanent: true
      },
      {
        source: '/en/case-studies/wordpress-plugin-woocommerce-custom-paintings',
        destination: '/en/projects/wordpress-plugin-woocommerce-custom-paintings',
        permanent: true
      },
      {
        source: '/case-studies/wordpress-plugin-woocommerce-custom-paintings',
        destination: '/en/projects/wordpress-plugin-woocommerce-custom-paintings',
        permanent: true
      }
    ];
  }
};

module.exports = withContentlayer(withNextIntl(nextConfig));
