import { notFound } from 'next/navigation';
import { allPosts, type Post } from 'contentlayer/generated';

import { PostHeader } from '../../ui/post-header';
import { PostContent } from '@/app/[locale]/ui/post-content';

export default function Post({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const post = allPosts.find((p: Post) => p.slug === slug && p.locale === locale);

  if (!post) {
    notFound();
  }

  return (
    <article className='container mx-auto max-w-4xl px-4 py-24 md:py-32'>
      <PostHeader {...post} />
      <PostContent content={post.body.code} />
    </article>
  );
}
