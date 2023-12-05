import { notFound } from 'next/navigation';
import { allProjects, type Project } from 'contentlayer/generated';

import { PostHeader } from '../../ui/post-header';
import { PostContent } from '../../ui/post-content';

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
