'use client';

import { ReactNode } from 'react';

import { GitHub, X, LinkedIn, WordPress, Polywork, CV } from '../ui/icons';
import { useTranslations } from 'next-intl';

const socialLinks: { name: string; url: string; logo: ReactNode }[] = [
  { name: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB!, logo: <GitHub /> },
  { name: 'X', url: process.env.NEXT_PUBLIC_X!, logo: <X /> },
  { name: 'LinkedIn', url: process.env.NEXT_PUBLIC_LINKEDIN!, logo: <LinkedIn /> },
  { name: 'WordPress', url: process.env.NEXT_PUBLIC_WORDPRESS!, logo: <WordPress /> },
  { name: 'Polywork', url: process.env.NEXT_PUBLIC_POLYWORK!, logo: <Polywork /> },
  { name: 'CV', url: process.env.NEXT_PUBLIC_CV!, logo: <CV /> }
];

export const SocialMedia: React.FC = () => {
  const t = useTranslations('homepage.hero');

  return (
    <ul className='flex gap-x-2'>
      {socialLinks.map(({ name, url, logo }) => (
        <li key={name}>
          <button
            className='rounded-md bg-gray-100/0 p-1.5 transition duration-200 hover:bg-gray-100/100 dark:hover:bg-slate-800'
            onClick={() => window.open(url, '_blank')}
            aria-label={t('link-to-al', { socialNetwork: name })}
          >
            {logo}
          </button>
        </li>
      ))}
    </ul>
  );
};
