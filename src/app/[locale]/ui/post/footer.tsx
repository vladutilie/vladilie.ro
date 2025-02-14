'use client';

import { ReactNode, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Post, Project } from 'contentlayer/generated';

import { getPathname } from '@/i18n/routing';
import { Facebook, LinkedIn, WhatsApp, X } from '../icons';
import { Tag } from '../tag';

export const Footer: React.FC<Project | Post> = (post) => {
  const t = useTranslations('projects');
  const locale = useLocale() as 'ro' | 'en';

  const socialLinks: { name: string; url: string; logo: ReactNode }[] = useMemo(() => {
    let page = getPathname({ href: '/blog', locale });
    if ('technologies' in post) {
      page = getPathname({ href: '/projects', locale });
    }

    let localePrefix = '';
    if ('ro' === locale) {
      localePrefix = '/ro/';
    }
    const url = new URL(`${localePrefix}${page}/${post.slug}`, process.env.NEXT_PUBLIC_SITE_URL!);

    return [
      { name: 'X', url: `https://x.com/intent/tweet?url=${url}&text=${post.description}&via=vladilie`, logo: <X /> },
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
    <div className='flex flex-col justify-between gap-4 border-t sm:flex-row'>
      {'technologies' in post && (
        <div className='flex w-full flex-col sm:w-4/5'>
          <p className='text-md font-semibold'>{t('technologies')}</p>
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
        <p className={`text-md font-semibold ${'technologies' in post ? 'sm:text-right' : ''}`}>{t('share')}</p>
        <ul className={`flex gap-x-2 ${'technologies' in post ? 'sm:self-end' : ''}`}>
          {socialLinks.map(({ name, url, logo }) => (
            <li key={name} className={'WhatsApp' === name ? 'md:hidden' : ''}>
              <button
                className='rounded-md bg-gray-100/0 p-1.5 transition duration-200 hover:bg-gray-100/100 dark:hover:bg-slate-800'
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
