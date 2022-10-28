import Image from 'next/image';
import Link from 'next/link';

import { Quotes } from '../../icons';
import { Testimonial as TestimonialType } from '../../types/Testimonial.type';

export const Testimonial: React.FC<TestimonialType> = ({ author, company, hash, position, text, url }) => {
  return (
    <div className='relative flex cursor-pointer flex-col gap-y-2 rounded-md border bg-white p-4 text-gray-500 hover:shadow hover:shadow-blue-500'>
      <Quotes className='absolute right-4 top-4 z-0 w-10 opacity-10' />

      <p className='z-10'>{text}</p>

      <div className='flex items-center gap-x-2'>
        <div className='relative h-6 w-6'>
          <Image
            src={`https://gravatar.com/avatar/${hash}`}
            alt={author}
            fill
            className='rounded-full object-contain'
          />
        </div>
        <p className='text-gray-400'>
          {author}{' '}
          {company && position ? (
            <>
              {'\u2014'} {position} at{' '}
              <Link href={url as string} target='_blank'>
                {company}
              </Link>
            </>
          ) : (
            ''
          )}
        </p>
      </div>
    </div>
  );
};
