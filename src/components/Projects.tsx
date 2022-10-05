import Image from 'next/image';
import Link from 'next/link';

import { Project } from '../types';

export const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <section className='flex flex-col gap-y-3'>
      <h3>Projects I&apos;ve built</h3>
      {/* https://codepen.io/paulobrien/pen/GROOOVQ */}
      <div className='projects relative flex h-14 items-center overflow-x-hidden'>
        <div className='project-stack absolute flex shrink-0 animate-slide justify-around'>
          {projects.map(({ blurDataUrl, height, image, link, name, width }: Project) => (
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
                  priority
                />
              </a>
            </Link>
          ))}
        </div>

        <div className='project-stack absolute flex shrink-0 translate-x-1/2 animate-slide2 justify-around'>
          {projects.map(({ blurDataUrl, height, image, link, name, width }: Project) => (
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
    </section>
  );
};
