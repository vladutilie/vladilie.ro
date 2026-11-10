/**
 * Cookie consent: what the visitor agreed to, kept in one first-party cookie. Read and written in
 * the browser only, so every page stays static.
 */

export const CONSENT_COOKIE = 'vladilie-consent';

/** Bump when the categories change, so everyone is asked again. */
const CONSENT_VERSION = 1;

/** Six months, after which the visitor is asked again. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

/** Optional categories; strictly necessary storage needs no consent and isn't listed. */
export type ConsentT = {
  /** Vercel Web Analytics: cookieless, but it sends page views to Vercel. */
  analytics: boolean;
};

export const NO_CONSENT: ConsentT = { analytics: false };
export const FULL_CONSENT: ConsentT = { analytics: true };

export const serializeConsent = (consent: ConsentT): string =>
  JSON.stringify({ v: CONSENT_VERSION, a: consent.analytics ? 1 : 0 });

/** The stored choice, or null when the visitor hasn't chosen yet (or chose under an older version). */
export const parseConsent = (value: string | undefined | null): ConsentT | null => {
  if (!value) {
    return null;
  }

  try {
    const data = JSON.parse(value);

    return data?.v === CONSENT_VERSION ? { analytics: 1 === data.a } : null;
  } catch {
    return null;
  }
};
