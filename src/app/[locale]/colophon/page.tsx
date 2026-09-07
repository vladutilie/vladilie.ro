import { ReactNode, JSX } from 'react';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPathname } from '@/i18n/routing';
import { Page, PageHeader } from '../ui/page-header';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('colophon');
  const commonFields = { title: t('title'), description: t('metadata.description') };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/colophon' }) },
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/colophon', locale }),
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [{ url: '/images/social-card.png', width: 1200, height: 630 }],
      locale,
      type: 'website'
    },
    twitter: {
      ...commonFields,
      card: 'summary_large_image',
      creator: '@vladilie94',
      creatorId: '66733656',
      images: ['/images/social-card.png']
    }
  };
}

export default async function Colophon({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('colophon');

  return (
    <Page narrow>
      <PageHeader title={t('title')} />
      <p>
        {t.rich('p1', {
          url: (chunk: ReactNode): JSX.Element => (
            <a href='https://sagarshah.dev' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          )
        })}
      </p>
      <p>
        {t.rich('p2', {
          nextjs: (chunk: ReactNode): JSX.Element => (
            <a href='https://nextjs.org' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          planet: (chunk: ReactNode): JSX.Element => <span className='line-through'>{chunk}</span>,
          supa: (chunk: ReactNode): JSX.Element => (
            <a href='https://supabase.com' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          mdx: (chunk: ReactNode): JSX.Element => (
            <a href='https://mdxjs.com' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          tailwind: (chunk: ReactNode): JSX.Element => (
            <a href='https://tailwindcss.com' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          typescript: (chunk: ReactNode): JSX.Element => (
            <a href='https://www.typescriptlang.org' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          vercel: (chunk: ReactNode): JSX.Element => (
            <a href='https://vercel.com' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          )
        })}
      </p>
      <p>
        {t.rich('p3', {
          new: (chunk: ReactNode) => (
            <a href='https://github.com/vladutilie/vladilie.ro' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          old: (chunk: ReactNode) => (
            <a
              href='https://github.com/vladutilie/vladilie.ro/tree/old-version-2023'
              target='_blank'
              className="after:content-['_↗']"
            >
              {chunk}
            </a>
          )
        })}
      </p>
    </Page>
  );
}
