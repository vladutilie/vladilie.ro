import Image from 'next/image';
import Link from 'next/link';

import { Arrow } from '../icons';
import { Tool as ToolType } from '../types';

export const Tool: React.FC<ToolType> = ({ logo, name, description, url }) => {
  return (
    <Link href={url} className='dev-tool flex w-full flex-col items-center gap-x-6 md:flex-row' target='_blank'>
      <Image src={logo} width={72} height={72} alt={name} className='h-16 w-16' />

      <div className='w-full'>
        <h3>{name}</h3>
        <span>{description}</span>
      </div>

      <div className='ml-auto hidden w-12 md:block'>
        <Arrow className='w-4 fill-blue-500 opacity-0 transition-all duration-300' />
      </div>
    </Link>
  );
};
