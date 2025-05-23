import Image from 'next/image';
import { Project } from 'contentlayer/generated';

import { Link } from '@/i18n/routing';
import { Tag } from '../tag';

export const ProjectCard: React.FC<Project & { idx: number }> = ({ idx, ...project }) => (
  <div
    key={project._id}
    className={`flex flex-col rounded-xl shadow-md ${1 === idx % 2 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
  >
    <div
      className={`flex w-full items-center justify-center rounded-t-xl bg-gray-50 p-8 lg:w-1/2 lg:p-12 dark:bg-slate-800 ${
        1 === idx % 2 ? 'md:rounded-tl-none md:rounded-r-xl' : 'md:rounded-l-xl md:rounded-tr-none'
      }`}
    >
      <Link
        href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
        className='relative aspect-video w-full lg:h-80'
      >
        <Image
          alt={project.title}
          blurDataURL={project.blurDataImage}
          className='rounded-xl object-cover shadow-lg transition-transform duration-500 md:hover:scale-105'
          fill
          placeholder='blur'
          src={project.featuredImage}
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </Link>
    </div>

    <div
      className={`flex w-full flex-col gap-6 rounded-b-xl p-8 lg:w-1/2 lg:p-12 dark:bg-slate-900 ${
        1 === idx % 2 ? 'md:rounded-tl-xl md:rounded-br-none' : 'md:rounded-r-xl md:rounded-bl-none'
      }`}
    >
      <Link
        href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
        className='text-xl font-semibold text-gray-800 hover:text-gray-800 dark:text-white'
      >
        {project.title}
      </Link>
      <p className='text-gray-500'>{project.description}</p>
      <ul className='flex flex-wrap gap-2'>
        {project.technologies.map((label) => (
          <li key={label}>
            <Tag label={label} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);
