'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { type ConsentT, FULL_CONSENT, NO_CONSENT } from '@/lib/consent';
import { useConsent } from './consent-provider';

// Accept and reject look the same on purpose: refusing must be as easy as agreeing.
const button =
  'inline-flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors';
const primary = `${button} bg-content text-surface hover:bg-signal hover:text-ink`;
const outline = `${button} border border-hairline-strong text-content hover:border-content`;

/** An on/off switch; `disabled` for the category that can't be turned off. */
const Toggle: React.FC<{
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
}> = ({ checked, disabled, onChange, label }) => (
  <button
    type='button'
    role='switch'
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
      checked ? 'bg-signal' : 'bg-content/25'
    }`}
  >
    <span
      className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5.5' : 'translate-x-0.5'}`}
    />
  </button>
);

const policyLink = (chunk: ReactNode) => (
  <Link href='/cookie-policy' className='text-content underline underline-offset-4'>
    {chunk}
  </Link>
);

const Settings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const t = useTranslations('cookies');
  const { consent, save } = useConsent();
  const [draft, setDraft] = useState<ConsentT>(consent);

  const categories = [
    { key: 'necessary', checked: true, disabled: true },
    { key: 'analytics', checked: draft.analytics, disabled: false }
  ] as const;

  return (
    <>
      <div className='mb-1 flex items-start justify-between gap-4'>
        <h2 className='my-0 text-xl tracking-[-0.02em]'>{t('settings-title')}</h2>
        <button
          type='button'
          onClick={onClose}
          aria-label={t('close')}
          className='text-content/70 hover:text-content -mt-1 cursor-pointer text-lg'
        >
          ✕
        </button>
      </div>
      <p className='text-content/75 my-0 mb-4 text-sm leading-relaxed'>
        {t.rich('settings-lead', { link: policyLink })}
      </p>

      <ul className='border-hairline m-0 list-none divide-y divide-[var(--hairline)] border-y p-0'>
        {categories.map(({ key, checked, disabled }) => (
          <li key={key} className='flex items-start justify-between gap-5 py-4'>
            <div>
              <p className='text-content my-0 font-semibold'>{t(`${key}.title`)}</p>
              <p className='text-content/70 my-0 mt-1 text-sm leading-relaxed'>{t(`${key}.description`)}</p>
            </div>

            <Toggle
              label={t(`${key}.title`)}
              checked={checked}
              disabled={disabled}
              onChange={(value) => setDraft({ ...draft, analytics: value })}
            />
          </li>
        ))}
      </ul>

      <div className='mt-5 flex flex-wrap gap-2.5'>
        <button type='button' className={outline} onClick={() => save(NO_CONSENT)}>
          {t('reject')}
        </button>
        <button type='button' className={outline} onClick={() => save(draft)}>
          {t('save')}
        </button>
        <button type='button' className={primary} onClick={() => save(FULL_CONSENT)}>
          {t('accept')}
        </button>
      </div>
    </>
  );
};

/** The first-visit banner, plus the settings dialog it (and the footer button) can open. */
export const CookieBanner: React.FC<{
  showBanner: boolean;
  settingsOpen: boolean;
  onSettingsOpenChange: (open: boolean) => void;
}> = ({ showBanner, settingsOpen, onSettingsOpenChange }) => {
  const t = useTranslations('cookies');
  const { save } = useConsent();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (settingsOpen && !dialog.current?.open) {
      dialog.current?.showModal();
    } else if (!settingsOpen && dialog.current?.open) {
      dialog.current.close();
    }
  }, [settingsOpen]);

  return (
    <>
      {showBanner && !settingsOpen && (
        <section
          aria-label={t('title')}
          className='border-hairline bg-surface-raised fixed inset-x-4 bottom-4 z-50 rounded-[14px] border p-5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] sm:inset-x-auto sm:left-6 sm:max-w-md'
        >
          <p className='text-content my-0 text-lg font-bold tracking-[-0.02em]'>{t('title')}</p>
          <p className='text-content/75 my-0 mt-2 text-sm leading-relaxed'>{t.rich('banner', { link: policyLink })}</p>

          <div className='mt-4 flex flex-wrap gap-2.5'>
            <button type='button' className={outline} onClick={() => save(NO_CONSENT)}>
              {t('reject')}
            </button>
            <button type='button' className={primary} onClick={() => save(FULL_CONSENT)}>
              {t('accept')}
            </button>
          </div>

          <button
            type='button'
            className='text-content/70 hover:text-content mt-3 cursor-pointer text-sm underline underline-offset-4 transition-colors'
            onClick={() => onSettingsOpenChange(true)}
          >
            {t('customize')}
          </button>
        </section>
      )}

      <dialog
        ref={dialog}
        onClose={() => onSettingsOpenChange(false)}
        className='border-hairline bg-surface-raised text-content m-auto w-[calc(100%-2rem)] max-w-lg rounded-[14px] border p-6 backdrop:bg-black/40 backdrop:backdrop-blur-xs'
      >
        {/* Remounted on every open, so the toggles start from the saved choice. */}
        {settingsOpen && <Settings onClose={() => onSettingsOpenChange(false)} />}
      </dialog>
    </>
  );
};

/** Footer button that reopens the settings. */
export const CookieSettingsButton: React.FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations('cookies');
  const { openSettings } = useConsent();

  return (
    <button type='button' onClick={openSettings} className={`cursor-pointer ${className ?? ''}`}>
      {t('settings-title')}
    </button>
  );
};
