import { notFound } from 'next/navigation';
import { allProjects, type Project } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { PostHeader } from '../../ui/post-header';

export default function Post({ params: { slug } }: { params: { slug: string } }) {
  const project = allProjects.find((post: Project) => post.slug === slug);

  if (!project) {
    notFound();
  }

  const MDXContent = useMDXComponent(project.body.code);

  return (
    <article className='container mx-auto max-w-4xl px-4 py-24 md:py-32'>
      <PostHeader {...project} />
      <MDXContent />
    </article>
  );
}
