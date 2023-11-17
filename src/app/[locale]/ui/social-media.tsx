'use client';

import { ReactNode } from 'react';

import { GitHub, X, LinkedIn, WordPress, Polywork } from '../ui/icons';

const socialLinks: { name: string; url: string; logo: ReactNode }[] = [
  { name: 'GitHub', url: 'https://github.com/vladutilie', logo: <GitHub /> },
  { name: 'X', url: 'https://x.com/vladilie94', logo: <X /> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vladilie', logo: <LinkedIn /> },
  { name: 'WordPress', url: 'https://profiles.w.org/vladwtz', logo: <WordPress /> },
  { name: 'Polywork', url: 'https://www.polywork.com/vladilie', logo: <Polywork /> }
];

export const SocialMedia: React.FC = () => (
  <ul className='flex gap-x-2'>
    {socialLinks.map(({ name, url, logo }) => (
      <li key={name}>
        <button
          className='rounded-md bg-gray-100 bg-opacity-0 p-1.5 transition duration-200 hover:bg-opacity-100 dark:hover:bg-slate-800'
          onClick={() => window.open(url, '_blank')}
        >
          {logo}
        </button>
      </li>
    ))}
  </ul>
);
