import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPathname } from '@/i18n/routing';
import { Form } from './ui/form';
import { Page, PageHeader } from '../ui/page-header';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('contact');
  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: { canonical: getPathname({ locale, href: '/contact' }) },
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/contact', locale }),
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

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');

  return (
    <Page>
      <PageHeader title={t('title')} lead={t('description')} />

      <Form />
    </Page>
  );
}
