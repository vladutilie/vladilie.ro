/**
 * Security headers for every response, set from `next.config.js`. Modelled on booktruck's. Plain
 * CommonJS, no path aliases: next.config loads it as is.
 *
 * Every page is static and there's no admin, so a single CSP without a nonce covers the whole site.
 */

/** The Vercel toolbar on preview deployments (https://vercel.com/docs/vercel-toolbar). */
const VERCEL_TOOLBAR = {
  script: ['https://vercel.live'],
  connect: ['https://vercel.live', 'wss://ws-us3.pusher.com'],
  frame: ['https://vercel.live'],
  style: ['https://vercel.live'],
  font: ['https://vercel.live', 'https://assets.vercel.com']
};

/**
 * Inline scripts are allowed (Next.js inlines its own, next-themes sets the theme before the first
 * paint); external ones only from this site. Vercel Web Analytics loads from /_vercel/insights.
 *
 * @param {{ isDev?: boolean, isPreview?: boolean }} [options]
 * @returns {string}
 */
const contentSecurityPolicy = ({
  isDev = 'development' === process.env.NODE_ENV,
  isPreview = 'preview' === process.env.VERCEL_ENV
} = {}) => {
  /** @param {keyof typeof VERCEL_TOOLBAR} key */
  const toolbar = (key) => (isPreview ? VERCEL_TOOLBAR[key] : []);

  /** @type {Record<string, string[]>} */
  const directives = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      // React rebuilds server error stacks with eval in development only.
      ...(isDev ? ["'unsafe-eval'"] : []),
      // Vercel Web Analytics loads its debug script from here in development.
      ...(isDev ? ['https://va.vercel-scripts.com'] : []),
      ...toolbar('script')
    ],
    // `style` attributes (React, next/image placeholders) need it.
    'style-src': ["'self'", "'unsafe-inline'", ...toolbar('style')],
    // next/image serves remote images from this site, but MDX content may link images directly.
    'img-src': ["'self'", 'data:', 'blob:', 'https:'],
    // next/font self-hosts the Google fonts.
    'font-src': ["'self'", 'data:', ...toolbar('font')],
    'media-src': ["'self'"],
    'connect-src': ["'self'", ...(isDev ? ['https://va.vercel-scripts.com'] : []), ...toolbar('connect')],
    'frame-src': ["'self'", ...toolbar('frame')],
    'worker-src': ["'self'", 'blob:'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    // Locally the site may run on plain http.
    ...(isDev ? {} : { 'upgrade-insecure-requests': [] })
  };

  return Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(' '))
    .join('; ');
};

/** Browser features nobody on the site uses, switched off for the page and every embed. */
const PERMISSIONS_POLICY = [
  'accelerometer',
  'browsing-topics',
  'camera',
  'display-capture',
  'geolocation',
  'gyroscope',
  'hid',
  'magnetometer',
  'microphone',
  'midi',
  'payment',
  'serial',
  'usb',
  'xr-spatial-tracking'
]
  .map((feature) => `${feature}=()`)
  .join(', ');

/** @type {{ key: string, value: string }[]} */
const SECURITY_HEADERS = [
  // Legacy counterpart of `frame-ancestors 'none'`.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Full URL on this site, only the origin elsewhere.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: PERMISSIONS_POLICY },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy() }
];

module.exports = { contentSecurityPolicy, SECURITY_HEADERS };
