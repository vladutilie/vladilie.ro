import Image from 'next/image';
import { Project } from 'contentlayer/generated';

import { Link } from '@/i18n/routing';

export const ProjectCard: React.FC<Project> = (project) => (
  <li>
    <Link
      href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
      className='group flex h-full flex-col overflow-hidden rounded-[4px] border border-hairline bg-surface text-content transition-colors hover:border-accent hover:text-content'
    >
      <div className='relative aspect-16/10 border-b border-hairline'>
        <Image
          alt={project.title}
          blurDataURL={project.blurDataImage}
          className='object-cover'
          fill
          placeholder='blur'
          src={project.featuredImage}
          sizes='(max-width: 768px) 100vw, 33vw'
        />
      </div>

      <div className='flex flex-1 flex-col p-6 pb-7'>
        <div className='mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-accent'>
          {project.technologies.slice(0, 2).join(' · ')}
        </div>

        <h3 className='my-0 mb-2.5 text-xl leading-tight transition-colors group-hover:text-accent'>{project.title}</h3>

        <p className='my-0 mb-5 text-[15px] leading-relaxed'>{project.description}</p>

        <ul className='mt-auto flex flex-wrap gap-1.5'>
          {project.technologies.map((label) => (
            <li
              key={label}
              className='rounded-[3px] border border-hairline px-2.5 py-1 font-mono text-[11px] text-content/55'
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  </li>
);
