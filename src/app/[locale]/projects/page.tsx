import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { allProjects } from '@/lib/content';
import type { Project as ProjectT } from '@/lib/content.types';

import { getPathname } from '@/i18n/routing';
import { Project } from './ui/project';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('projects');
  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/projects' }) },
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
    <main className='mx-auto max-w-[1180px] gap-8 px-5 py-16 md:px-8 md:py-24'>
      <h1>{t('title')}</h1>

      {projects.length ? (
        <>
          <p>{t('description')}</p>
          <div className='grid grid-cols-6 gap-8'>
            {projects.map((project: ProjectT) => (
              <Project key={project.slug} {...project} />
            ))}
          </div>
        </>
      ) : (
        <p>{t('no-projects')}</p>
      )}
    </main>
  );
}
