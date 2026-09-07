'use client';

import { ReactNode, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Post, Project } from '@/lib/content.types';

import { getPathname } from '@/i18n/routing';
import { Bluesky, Facebook, LinkedIn, WhatsApp, X } from '../icons';
import { Tag } from '../tag';

export const Footer: React.FC<Project | Post> = (post) => {
  const t = useTranslations('projects');
  const locale = useLocale() as 'ro' | 'en';

  const socialLinks: { name: string; url: string; logo: ReactNode }[] = useMemo(() => {
    let page = getPathname({ href: '/blog', locale });
    if ('technologies' in post) {
      page = getPathname({ href: '/projects', locale });
    }

    const url = new URL(`${page}/${post.slug}`, process.env.NEXT_PUBLIC_SITE_URL!);

    return [
      { name: 'X', url: `https://x.com/intent/tweet?url=${url}&text=${post.description}&via=vladilie`, logo: <X /> },
      {
        name: 'Bluesky',
        url: `https://bsky.app/intent/compose?text=${post.description} ${url}`,
        logo: <Bluesky />
      },
      {
        name: 'LinkedIn',
        url: `https://www.linkedin.com/shareArticle?url=${url}&title=${post.title}`,
        logo: <LinkedIn />
      },
      { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}`, logo: <Facebook /> },
      { name: 'WhatsApp', url: `whatsapp://send?text=${post.description}%20${url}`, logo: <WhatsApp /> }
    ];
  }, [post, locale]);

  return (
    <div className='border-hairline mt-12 flex flex-col justify-between gap-6 border-t pt-8 sm:flex-row'>
      {'technologies' in post && (
        <div className='flex w-full flex-col sm:w-4/5'>
          <p className='text-content/45 my-0 mb-3 font-mono text-[11px] tracking-[0.12em] uppercase'>
            {t('technologies')}
          </p>
          <ul className='flex flex-wrap gap-2'>
            {post.technologies.map((item) => (
              <li key={item}>
                <Tag label={item} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='flex w-full flex-col sm:w-1/5'>
        <p
          className={`text-content/45 my-0 mb-3 font-mono text-[11px] tracking-[0.12em] uppercase ${
            'technologies' in post ? 'sm:text-right' : ''
          }`}
        >
          {t('share')}
        </p>
        <ul className={`flex gap-x-2 ${'technologies' in post ? 'sm:self-end' : ''}`}>
          {socialLinks.map(({ name, url, logo }) => (
            <li key={name} className={'WhatsApp' === name ? 'md:hidden' : ''}>
              <button
                className='hover:bg-hover-tint cursor-pointer rounded-md p-1.5 transition-colors duration-200'
                onClick={() =>
                  window.open(url, t('share-on', { network: name }), 'left=20,top=20,width=500,height=600,toolbar=1')
                }
                aria-label={t('share-on', { network: name })}
              >
                {logo}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
