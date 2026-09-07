'use client';

import { isValidElement } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export const LocalizedCard: React.FC<{
  name: string;
  logo: StaticImport;
  darkLogo?: StaticImport;
  url: string;
  i18nKey: string;
}> = ({ name, logo, darkLogo, url, i18nKey }) => {
  const t = useTranslations('homepage.sw-l10n');
  const { resolvedTheme } = useTheme();

  return (
    <a
      href={url}
      target='_blank'
      rel='noreferrer'
      className='group block bg-surface p-6 text-content transition-colors hover:bg-hover-tint hover:text-content'
    >
      <div className='mb-3 flex items-center gap-2.5'>
        <span className='grid h-[22px] w-[22px] shrink-0 place-items-center overflow-hidden rounded-[5px] border border-hairline-strong'>
          {isValidElement(logo) ? (
            logo
          ) : (
            <Image
              src={'dark' === resolvedTheme && darkLogo ? darkLogo : logo}
              alt={name}
              className='h-full w-full object-contain grayscale transition group-hover:grayscale-0'
            />
          )}
        </span>

        <h3 className="my-0 text-base font-semibold after:opacity-0 after:transition-opacity after:content-['_↗'] group-hover:after:opacity-100">
          {name}
        </h3>
      </div>

      <p className='my-0 text-[13.5px] leading-[1.55] text-content/62'>{t(i18nKey)}</p>
    </a>
  );
};
