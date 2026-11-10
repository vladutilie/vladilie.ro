import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getProject, projectVersions } from '@/lib/content';
import { localeAlternates } from '@/lib/alternates';

import { getPathname } from '@/i18n/routing';
import { Header, Content, Footer } from '../../ui/post';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: 'en' | 'ro'; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug, locale);
  const t = await getTranslations('projects');
  if (!project) {
    return { title: `${t('metadata.404-error')} | ${t('title')}` };
  }

  const commonFields = { title: `${project?.title} | ${t('title')}`, description: project?.description };

  return {
    alternates: localeAlternates(
      locale,
      Object.fromEntries(
        Object.entries(projectVersions(slug, locale)).map(([l, s]) => [
          l,
          { pathname: '/projects/[slug]', params: { slug: s! } }
        ])
      )
    ),
    ...commonFields,
    keywords: project?.keywords,
    openGraph: {
      ...commonFields,
      url: `${getPathname({ href: '/projects', locale })}/${slug}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        ...(project.featuredImage ? [{ url: project.featuredImage, alt: project.title }] : []),
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
      images: [...(project.featuredImage ? [project.featuredImage] : []), '/images/social-card.png']
    }
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const project = getProject(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <article className='mx-auto max-w-3xl px-6 py-16 md:py-24'>
      <Header {...project} kicker={project.kind} />
      <Content content={project.body} />
      <Footer {...project} />
    </article>
  );
}
