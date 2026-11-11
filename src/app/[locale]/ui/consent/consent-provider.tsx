'use client';

import { Analytics } from '@vercel/analytics/next';
import { getCookie, setCookie } from 'cookies-next/client';
import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from 'react';

import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE,
  type ConsentT,
  NO_CONSENT,
  parseConsent,
  serializeConsent
} from '@/lib/consent';
import { CookieBanner } from './cookie-banner';

type ConsentContextT = {
  /** The visitor's choice; everything optional is off until they make one. */
  consent: ConsentT;
  /** Saves a choice and closes the settings. */
  save: (consent: ConsentT) => void;
  /** Reopens the settings, e.g. from the footer. */
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextT | null>(null);

export const useConsent = (): ConsentContextT => {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error('useConsent must be used inside <ConsentProvider>.');
  }

  return context;
};

const noop = () => () => {};

/**
 * The stored cookie, read in the browser so the pages stay static.
 * `undefined` until hydrated, which keeps the banner out of the prerendered HTML.
 */
const useStoredCookie = () =>
  useSyncExternalStore(
    noop,
    () => (getCookie(CONSENT_COOKIE) as string | undefined) ?? null,
    () => undefined
  );

/** Holds the cookie choice, shows the banner until there is one, and loads analytics only once allowed. */
export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cookie = useStoredCookie();
  const fromCookie = useMemo(() => (undefined === cookie ? undefined : parseConsent(cookie)), [cookie]);
  // A choice made on this page; until then, whatever the cookie says.
  const [saved, setSaved] = useState<ConsentT>();
  const stored = saved ?? fromCookie;
  const [settingsOpen, setSettingsOpen] = useState(false);

  const save = useCallback(
    (consent: ConsentT) => {
      setCookie(CONSENT_COOKIE, serializeConsent(consent), {
        maxAge: CONSENT_MAX_AGE,
        path: '/',
        sameSite: 'lax',
        secure: 'https:' === window.location.protocol
      });

      // The analytics script stays in the page once injected, so withdrawing consent takes a reload.
      if (stored?.analytics && !consent.analytics) {
        window.location.reload();

        return;
      }

      setSaved(consent);
      setSettingsOpen(false);
    },
    [stored]
  );

  const value = useMemo(
    () => ({ consent: stored ?? NO_CONSENT, save, openSettings: () => setSettingsOpen(true) }),
    [stored, save]
  );

  return (
    <ConsentContext value={value}>
      {children}

      {/* Cookieless, but it still sends data to Vercel, so it waits for a yes. */}
      {stored?.analytics && <Analytics />}

      <CookieBanner showBanner={null === stored} settingsOpen={settingsOpen} onSettingsOpenChange={setSettingsOpen} />
    </ConsentContext>
  );
};
