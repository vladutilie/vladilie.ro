import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { allProjects, type Project as ProjectT } from 'contentlayer/generated';

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
  const projects = allProjects
    .filter(({ locale: l }) => l === locale)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h1>{t('title')}</h1>

      {projects.length ? (
        <>
          <p>{t('description')}</p>
          <div className='grid grid-cols-6 gap-8'>
            {projects.map((project: ProjectT) => (
              <Project key={project._id} {...project} />
            ))}
          </div>
        </>
      ) : (
        <p>{t('no-projects')}</p>
      )}
    </main>
  );
}
