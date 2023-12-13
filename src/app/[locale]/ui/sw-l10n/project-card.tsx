'use client';

import { isValidElement } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export const ProjectCard: React.FC<{
  name: string;
  logo: StaticImport;
  darkLogo?: StaticImport;
  url: string;
  i18nKey: string;
}> = ({ name, logo, darkLogo, url, i18nKey }) => {
  const t = useTranslations('homepage.sw-l10n');
  const { theme } = useTheme();

  return (
    <div className='group flex w-4/5 shrink-0 snap-center snap-always flex-col justify-center gap-y-2 self-stretch rounded-lg border p-4 hover:bg-gray-50 dark:border-slate-700 hover:dark:bg-slate-900 sm:w-3/4 md:w-1/2 lg:col-span-2 lg:w-auto'>
      {isValidElement(logo) ? (
        logo
      ) : (
        <Image
          src={'dark' === theme && darkLogo ? darkLogo : logo}
          alt={name}
          className='h-20 w-auto self-center object-contain grayscale transition group-hover:grayscale-0'
        />
      )}

      <h4 className='my-0 text-xl font-semibold'>
        <a
          href={url}
          target='_blank'
          className="text-inherit after:opacity-0 after:transition-opacity after:content-['_↗'] group-hover:after:opacity-100"
        >
          {name}
        </a>
      </h4>
      <p className='my-0 text-sm text-gray-600'>{t(i18nKey)}</p>
    </div>
  );
};
