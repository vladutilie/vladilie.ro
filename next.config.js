/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.gr-assets.com',
      'images-na.ssl-images-amazon.com',
      'cf.geekdo-images.com',
      'gcdahtftlmucxetygvev.supabase.co',
      'gravatar.com'
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
