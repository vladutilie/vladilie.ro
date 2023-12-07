import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/navigation';
import { allProjects, type Project } from 'contentlayer/generated';

import { PostHeader } from '../../ui/post-header';
import { PostContent } from '../../ui/post-content';

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: 'en' | 'ro'; slug: string };
}): Promise<Metadata> {
  const project = allProjects.find((p: Project) => p.slug === slug && p.locale === locale);
  const t = await getTranslations('projects');
  const commonFields = { title: `${project?.title} | ${t('title')}`, description: project?.description };

  return {
    ...commonFields,
    keywords: project?.keywords,
    openGraph: {
      ...commonFields,
      url: `${getPathname({ href: '/projects', locale })}/${slug}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        { url: project?.featuredImage!, alt: project?.title },
        { url: '/images/social-card.png', width: 1200, height: 630, alt: 'Social card' }
      ],
      locale,
      type: 'website'
    },
    twitter: {
      ...commonFields,
      card: 'summary_large_image',
      creator: '@vladilie94',
      creatorId: '66733656',
      images: [project?.featuredImage!, '/images/social-card.png']
    }
  };
}

export default function Post({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const project = allProjects.find((p: Project) => p.slug === slug && p.locale === locale);

  if (!project) {
    notFound();
  }

  return (
    <article className='container mx-auto max-w-4xl px-4 py-24 md:py-32'>
      <PostHeader {...project} />
      <PostContent content={project.body.code} />
    </article>
  );
}
