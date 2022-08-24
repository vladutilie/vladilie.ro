import Image from 'next/image';
import Link from 'next/link';

import {
  CSS,
  GitHub,
  HTML,
  JQuery,
  MongoDB,
  MySQL,
  Neo4j,
  NestJS,
  NextJS,
  NodeJS,
  PHP,
  PostgreSQL,
  Prisma,
  ReactJS,
  SQLite,
  Supabase,
  TailwindCSS,
  TypeScript
} from '../technologies';
import { Project } from '../types/Project.type';

export const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <section className='flex flex-col gap-y-3'>
      <h3>Projects I&apos;ve built &amp; used technologies</h3>
      {/* https://codepen.io/paulobrien/pen/GROOOVQ */}
      <div className='projects relative flex h-14 items-center overflow-x-hidden'>
        <div className='project-stack absolute flex shrink-0 animate-slide justify-around'>
          {projects.map(({ blurDataUrl, height, image, link, name, width }: any) => (
            <Link key={name} href={link}>
              <a className='flex-inline min-w-max self-center px-6' target='_blank'>
                <Image
                  alt={`${name} logo`}
                  className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                  height={height}
                  placeholder='blur'
                  blurDataURL={`data:image/jpeg,${blurDataUrl}`}
                  src={image}
                  width={width}
                />
              </a>
            </Link>
          ))}
        </div>

        <div className='project-stack absolute flex shrink-0 translate-x-1/2 animate-slide2 justify-around'>
          {projects.map(({ blurDataUrl, height, image, link, name, width }: any) => (
            <Link key={name} href={link}>
              <a className='flex-inline min-w-max self-center px-6' target='_blank'>
                <Image
                  alt={`${name} logo`}
                  className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                  height={height}
                  placeholder='blur'
                  blurDataURL={`data:image/jpeg,${blurDataUrl}`}
                  src={image}
                  width={width}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className='projects relative flex h-10 items-center overflow-x-hidden'>
        <div className='project-stack absolute flex shrink-0 animate-slide-slow justify-around'>
          <div className='flex-inline min-w-max self-center px-3'>
            <CSS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <GitHub className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <HTML className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <JQuery className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <MongoDB className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <MySQL className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Neo4j className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NestJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NextJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NodeJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <PHP className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <PostgreSQL className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Prisma className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <ReactJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <SQLite className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Supabase className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <TailwindCSS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <TypeScript className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
        </div>

        <div className='project-stack absolute flex shrink-0 translate-x-1/2 animate-slide-slow2 justify-around'>
          <div className='flex-inline min-w-max self-center px-3'>
            <CSS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <GitHub className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <HTML className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <JQuery className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <MongoDB className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <MySQL className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Neo4j className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NestJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NextJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NodeJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <PHP className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <PostgreSQL className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Prisma className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <ReactJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <SQLite className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Supabase className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <TailwindCSS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <TypeScript className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
        </div>
      </div>
    </section>
  );
};
