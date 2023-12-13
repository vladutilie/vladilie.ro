import { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={70} height={38} viewBox='0 0 1250 678' {...props}>
    <path
      fillRule='evenodd'
      d='m782 .5-314 677H328.5L0 .5h214L398.5 379 569 .5zm205 677H803V.5h184z'
      className='fill-[#141a1a] transition-colors duration-300 dark:fill-white'
    />
    <path d='M1250 677.5V521h-184v156.5z' className='fill-blue-600' />
  </svg>
);
