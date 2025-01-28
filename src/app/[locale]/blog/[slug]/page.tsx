import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { allPosts, type Post } from 'contentlayer/generated';

import { getPathname } from '@/i18n/routing';
import { Header, Content, Footer } from '../../ui/post';

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: 'en' | 'ro'; slug: string };
}): Promise<Metadata> {
  const post = allPosts.find((p: Post) => p.slug === slug && p.locale === locale);
  const t = await getTranslations('blog');
  if (!post) {
    return { title: `${t('metadata.404-error')} | ${t('title')}` };
  }

  const commonFields = { title: `${post?.title} | ${t('title')}`, description: post?.description };

  return {
    alternates: {
      canonical:
        ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: { pathname: '/blog/[slug]', params: { slug } } })
    },
    ...commonFields,
    keywords: post?.keywords,
    openGraph: {
      ...commonFields,
      url: `${getPathname({ href: '/blog', locale })}/${slug}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        { url: post?.featuredImage!, alt: post?.title },
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
      images: [post?.featuredImage!, '/images/social-card.png']
    }
  };
}

export default function Post({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const post = allPosts.find((p: Post) => p.slug === slug && p.locale === locale);

  if (!post) {
    notFound();
  }

  return (
    <article className='container mx-auto max-w-4xl px-4 py-24 md:py-32'>
      <Header {...post} />
      <Content content={post.body.code} />
      <Footer {...post} />
    </article>
  );
}
