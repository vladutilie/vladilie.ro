import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { allProjects } from '@/lib/content';
import type { Project as ProjectT } from '@/lib/content.types';

import { getPathname } from '@/i18n/routing';
import { everyLocale, localeAlternates } from '@/lib/alternates';
import { Project } from './ui/project';
import { Page, PageHeader } from '../ui/page-header';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('projects');
  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: localeAlternates(locale, everyLocale('/projects')),
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/projects', locale }),
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

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('projects');
  const projects = allProjects().filter(({ locale: l }) => l === locale);

  return (
    <Page>
      <PageHeader meta={t('count', { count: projects.length })} title={t('title')} lead={t('description')} />

      {projects.length ? (
        <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project: ProjectT) => (
            <Project key={project.slug} {...project} />
          ))}
        </ul>
      ) : (
        <p>{t('no-projects')}</p>
      )}
    </Page>
  );
}
