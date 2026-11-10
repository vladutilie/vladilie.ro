import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getPost } from '@/lib/content';

import { getPathname } from '@/i18n/routing';
import { Header, Content, Footer } from '../../ui/post';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: 'en' | 'ro'; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  const t = await getTranslations('blog');
  if (!post) {
    return { title: `${t('metadata.404-error')} | ${t('title')}` };
  }

  const commonFields = { title: `${post?.title} | ${t('title')}`, description: post?.description };

  return {
    alternates: {
      canonical: getPathname({ locale, href: { pathname: '/blog/[slug]', params: { slug } } })
    },
    ...commonFields,
    keywords: post?.keywords,
    openGraph: {
      ...commonFields,
      url: `${getPathname({ href: '/blog', locale })}/${slug}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        ...(post.featuredImage ? [{ url: post.featuredImage, alt: post.title }] : []),
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
      images: [...(post.featuredImage ? [post.featuredImage] : []), '/images/social-card.png']
    }
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const post = getPost(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <article className='mx-auto max-w-3xl px-6 py-16 md:py-24'>
      <Header {...post} />
      <Content content={post.body} />
      <Footer {...post} />
    </article>
  );
}
