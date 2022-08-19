import Link from 'next/link';
import Image from 'next/image';

import { FeaturedServiceType } from '../../types/FeaturedService.type';

export const FeaturedService: React.FC<FeaturedServiceType> = ({ image, title, url, description }) => {
  return (
    <li>
      <Link href={url}>
        <a
          className='flex w-full flex-col justify-center gap-y-8 rounded-md bg-white p-6 transition-transform hover:scale-105 md:flex-row md:gap-x-2'
          target='_blank'
        >
          <div className='flex w-full items-center justify-center md:w-1/6 md:p-2'>
            <Image src={image} placeholder='blur' alt={title} />
          </div>
          <div className='flex w-full flex-col gap-y-3 md:w-5/6'>
            <div className='flex flex-col items-start gap-y-2 md:flex-row md:items-center md:justify-between'>
              <h3>{title}</h3>
              <p className='text-sm text-blue-500'>{url.replace(/^https\:\/\/(.*?)\/?$/, '$1')}↗</p>
            </div>

            <p className='text-sm text-gray-500'>{description}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};
