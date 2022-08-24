import Image from 'next/image';
import Link from 'next/link';

import { Project, Technology } from '../types';

type Props = { projects: Project[]; technologies: Technology[] };
export const Projects: React.FC<Props> = ({ projects, technologies }) => {
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
          {technologies.map(({ blurDataUrl, height, image, name, width }: Technology) => (
            <div key={name} className='flex-inline min-w-max self-center px-3'>
              <div className='relative h-10'>
                <Image
                  alt={`${name} logo`}
                  className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                  height={height}
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml,${blurDataUrl}`}
                  src={image}
                  width={width}
                  title={name}
                />
              </div>
            </div>
          ))}
        </div>

        <div className='project-stack absolute flex shrink-0 translate-x-1/2 animate-slide-slow2 justify-around'>
          {technologies.map(({ blurDataUrl, height, image, name, width }: Technology) => (
            <div key={name} className='flex-inline min-w-max self-center px-3'>
              <div className='relative h-10'>
                <Image
                  alt={`${name} logo`}
                  className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                  height={height}
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml,${blurDataUrl}`}
                  src={image}
                  width={width}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
