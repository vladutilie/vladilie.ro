const fs = require('node:fs');
const path = require('node:path');
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    remotePatterns: [
      { protocol: 'https', hostname: 'i.gr-assets.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'cf.geekdo-images.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'gravatar.com' },
      {
        protocol: 'https',
        hostname: 'cbibpkpntrsbliyvvjde.supabase.co',
        pathname: '/storage/v1/object/public/projects/**'
      }
    ]
  },
  redirects() {
    return [
      // Old case-study URLs.
      ...['/ro', '/en', ''].map((prefix) => ({
        source: `${prefix}/case-studies/wordpress-plugin-woocommerce-custom-paintings`,
        destination: '/en/projects/wordpress-plugin-woocommerce-custom-paintings',
        permanent: true
      })),
      ...localeMoveRedirects()
    ];
  }
};

/*
  Until November 2026 English was served at the root and Romanian under /ro. Now Romanian is at the
  root and English under /en, so every indexed URL is moved permanently to its new address:

  - /ro/...                                → /...      (Romanian paths themselves didn't change)
  - /projects, /uses, /books... (English) → /en/...  (these segments only exist in English)
  - /blog/<english-post>                  → /en/blog/<english-post>

  /, /blog and /contact can't be redirected: the same paths now serve the Romanian pages, and hreflang
  points search engines to the English versions under /en.
*/
const englishOnlySegments = ['projects', 'locations', 'colophon', 'uses', 'books', 'boardgames', 'terms', 'privacy'];

const englishPostSlugs = () => {
  const dir = path.join(__dirname, 'content', 'blog');

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .filter((file) => /^locale:\s*en\s*$/m.test(fs.readFileSync(path.join(dir, file), 'utf8').split('---')[1] ?? ''))
    .map((file) => file.replace(/(\.en)?\.mdx$/, ''));
};

const localeMoveRedirects = () => [
  // A bug used to put /ro/ro/... in canonicals and the sitemap; send those straight to the right page.
  { source: '/ro/ro', destination: '/', permanent: true },
  { source: '/ro/ro/:path*', destination: '/:path*', permanent: true },
  { source: '/ro', destination: '/', permanent: true },
  { source: '/ro/:path*', destination: '/:path*', permanent: true },
  ...englishOnlySegments.flatMap((segment) => [
    { source: `/${segment}`, destination: `/en/${segment}`, permanent: true },
    { source: `/${segment}/:path*`, destination: `/en/${segment}/:path*`, permanent: true }
  ]),
  ...englishPostSlugs().map((slug) => ({ source: `/blog/${slug}`, destination: `/en/blog/${slug}`, permanent: true }))
];

module.exports = withNextIntl(nextConfig);
