import { notFound } from 'next/navigation';
import { allPosts, type Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { PostHeader } from '../../ui/post-header';

export default function Post({ params: { slug } }: { params: { slug: string } }) {
  const post = allPosts.find((post: Post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className='container mx-auto max-w-4xl px-4 py-16 md:py-32'>
      <PostHeader {...post} />
      <MDXContent />
    </article>
  );
}
