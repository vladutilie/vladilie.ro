import { ReactNode, JSX } from 'react';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link, getPathname } from '@/i18n/routing';
import { everyLocale, localeAlternates } from '@/lib/alternates';
import { CONSENT_COOKIE } from '@/lib/consent';
import { GroupHeading, Page, PageHeader } from '../ui/page-header';
import { CookieSettingsButton } from '../ui/consent/cookie-banner';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('cookie-policy');
  const commonFields = { title: t('title'), description: t('metadata.description') };

  return {
    alternates: localeAlternates(locale, everyLocale('/cookie-policy')),
    ...commonFields,
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/cookie-policy', locale }),
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [{ url: '/images/social-card.png', width: 1200, height: 630 }],
      locale,
      type: 'website'
    }
  };
}

/** Everything the site stores in, or sends from, the visitor's browser. */
const items = [
  { key: 'consent', name: CONSENT_COOKIE },
  { key: 'theme', name: 'theme' },
  { key: 'analytics', name: 'Vercel Web Analytics' }
] as const;

const fields = ['type', 'provider', 'purpose', 'duration', 'category'] as const;

const paragraph = 'text-content/80 my-0 mb-4 text-[17px] leading-[1.7]';

export default async function CookiePolicy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('cookie-policy');

  const privacy = (chunk: ReactNode): JSX.Element => (
    <Link href='/privacy' className='underline underline-offset-4'>
      {chunk}
    </Link>
  );

  return (
    <Page narrow>
      <PageHeader meta={t('updated')} title={t('title')} lead={t('lead')} />

      <section className='mb-14'>
        <GroupHeading>{t('what.title')}</GroupHeading>
        <p className={paragraph}>{t('what.p1')}</p>
      </section>

      <section className='mb-14'>
        <GroupHeading>{t('used.title')}</GroupHeading>
        <p className={paragraph}>{t('used.p1')}</p>

        <div className='grid gap-4'>
          {items.map(({ key, name }) => (
            <article key={key} className='border-hairline bg-surface-raised rounded-[14px] border p-6'>
              <h3 className='my-0 mb-4 font-mono text-[15px] font-medium tracking-normal'>{name}</h3>
              <dl className='m-0 grid gap-2.5'>
                {fields.map((field) => (
                  <div key={field} className='grid gap-0.5 sm:grid-cols-[120px_1fr] sm:gap-4'>
                    <dt className='text-accent font-mono text-[12.5px]'>{t(`fields.${field}`)}</dt>
                    <dd className='text-content/85 m-0 text-[15px] leading-normal'>{t(`items.${key}.${field}`)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className='mb-14'>
        <GroupHeading>{t('not-used.title')}</GroupHeading>
        <p className={paragraph}>{t('not-used.p1')}</p>
      </section>

      <section className='mb-14'>
        <GroupHeading>{t('choice.title')}</GroupHeading>
        <p className={paragraph}>{t('choice.p1')}</p>
        <CookieSettingsButton className='bg-content text-surface hover:bg-signal hover:text-ink rounded-full px-5 py-2.5 text-sm font-semibold transition-colors' />
        <p className={`${paragraph} mt-6`}>{t('choice.p2')}</p>
      </section>

      <section>
        <GroupHeading>{t('contact.title')}</GroupHeading>
        <p className={paragraph}>{t.rich('contact.p1', { privacy })}</p>
      </section>
    </Page>
  );
}
