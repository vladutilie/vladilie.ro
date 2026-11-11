import { ReactNode, JSX } from 'react';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPathname } from '@/i18n/routing';
import { everyLocale, localeAlternates } from '@/lib/alternates';
import { GroupHeading, Page, PageHeader } from '../ui/page-header';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('colophon');
  const commonFields = { title: t('title'), description: t('metadata.description') };

  return {
    alternates: localeAlternates(locale, everyLocale('/colophon')),
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

/** What the site runs on. Names are proper nouns; the note under each row is translated. */
const stack = [
  {
    key: 'framework',
    tools: [
      { name: 'Next.js 16', url: 'https://nextjs.org' },
      { name: 'React 19', url: 'https://react.dev' }
    ]
  },
  { key: 'language', tools: [{ name: 'TypeScript', url: 'https://www.typescriptlang.org' }] },
  { key: 'styling', tools: [{ name: 'Tailwind CSS v4', url: 'https://tailwindcss.com' }] },
  {
    key: 'content',
    tools: [
      { name: 'MDX', url: 'https://mdxjs.com' },
      { name: 'next-mdx-remote', url: 'https://github.com/hashicorp/next-mdx-remote' }
    ]
  },
  {
    key: 'highlighting',
    tools: [
      { name: 'rehype-pretty-code', url: 'https://rehype-pretty.pages.dev' },
      { name: 'Shiki', url: 'https://shiki.style' }
    ]
  },
  { key: 'i18n', tools: [{ name: 'next-intl', url: 'https://next-intl.dev' }] },
  {
    key: 'database',
    tools: [
      { name: 'Prisma 7', url: 'https://www.prisma.io' },
      { name: 'PostgreSQL', url: 'https://www.postgresql.org' },
      { name: 'Supabase', url: 'https://supabase.com' }
    ]
  },
  {
    key: 'forms',
    tools: [
      { name: 'react-hook-form', url: 'https://react-hook-form.com' },
      { name: 'zod', url: 'https://zod.dev' }
    ]
  },
  { key: 'email', tools: [{ name: 'Brevo', url: 'https://www.brevo.com' }] },
  { key: 'hosting', tools: [{ name: 'Vercel', url: 'https://vercel.com' }] }
] as const;

const fonts = {
  schibsted: 'https://fonts.google.com/specimen/Schibsted+Grotesk',
  plex: 'https://fonts.google.com/specimen/IBM+Plex+Mono'
};

const external = (href: string) => {
  const ExternalLink = (chunk: ReactNode): JSX.Element => (
    <a href={href} target='_blank' rel='noreferrer' className="after:content-['_↗']">
      {chunk}
    </a>
  );

  return ExternalLink;
};

export default async function Colophon({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('colophon');

  return (
    <Page narrow>
      <PageHeader meta={t('meta')} title={t('title')} lead={t('lead')} />

      <section className='mb-14'>
        <GroupHeading>{t('design.title')}</GroupHeading>
        <p className='my-0 mb-4 text-[17px] leading-[1.7] text-content/80'>{t('design.p1')}</p>
        <p className='my-0 text-[17px] leading-[1.7] text-content/80'>
          {t.rich('design.p2', { schibsted: external(fonts.schibsted), plex: external(fonts.plex) })}
        </p>
      </section>

      <section className='mb-14'>
        <GroupHeading>{t('stack.title')}</GroupHeading>
        <dl className='m-0 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline'>
          {stack.map(({ key, tools }) => (
            <div
              key={key}
              className='grid gap-1 bg-surface-raised px-[22px] py-[18px] sm:grid-cols-[140px_1fr] sm:items-baseline sm:gap-[18px]'
            >
              <dt className='font-mono text-[12.5px] text-accent'>{t(`stack.items.${key}.label`)}</dt>
              <dd className='m-0'>
                <div className='flex flex-wrap items-baseline gap-x-2'>
                  {tools.map(({ name, url }, idx) => (
                    <span key={name} className='flex items-baseline gap-x-2'>
                      {idx > 0 && (
                        <span aria-hidden className='text-content/40'>
                          ·
                        </span>
                      )}
                      <a
                        href={url}
                        target='_blank'
                        rel='noreferrer'
                        className="text-[15.5px] font-semibold text-content after:content-['_↗'] hover:text-accent"
                      >
                        {name}
                      </a>
                    </span>
                  ))}
                </div>
                <div className='mt-0.5 text-sm leading-normal text-content/70'>{t(`stack.items.${key}.note`)}</div>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <GroupHeading>{t('source.title')}</GroupHeading>
        <p className='my-0 text-[17px] leading-[1.7] text-content/80'>
          {t.rich('source.p1', {
            new: external('https://github.com/vladutilie/vladilie.ro'),
            old: external('https://github.com/vladutilie/vladilie.ro/tree/old-version-2024')
          })}
        </p>
      </section>
    </Page>
  );
}
