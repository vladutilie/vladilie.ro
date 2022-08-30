import Image from 'next/image';

import { Technology } from '../types';

export const Technologies: React.FC<{ technologies: Technology[] }> = ({ technologies }) => {
  return (
    <section className='flex flex-col gap-y-3'>
      <h3>Used technologies</h3>
      <div className='flex w-full flex-wrap gap-2.5'>
        {technologies.map(({ height, image, name, width }: Technology) => (
          <div
            key={name}
            id={`technology-${name}`}
            className='flex cursor-pointer items-center gap-x-2 rounded-full border px-3 py-1.5 text-sm opacity-75 grayscale transition-all hover:opacity-100 hover:grayscale-0'
          >
            <div className='relative' style={{ width, height }}>
              <Image alt={`${name} logo`} height={height} src={image} width={width} title={name} />
            </div>
            {name}
          </div>
        ))}
      </div>
    </section>
  );
};
