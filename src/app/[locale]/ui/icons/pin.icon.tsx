import { SVGProps } from 'react';

export const Pin = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
    <path
      className='stroke-gray-600 dark:stroke-gray-300'
      d='M19.64 9.14C19.64 15.82 12 22.5 12 22.5S4.36 15.82 4.36 9.14a7.64 7.64 0 0 1 15.28 0Z'
      fill='none'
      strokeWidth={1.91}
    />
    <circle
      className='stroke-gray-600 dark:stroke-gray-300'
      cx={12}
      cy={9.14}
      fill='none'
      r={2.86}
      strokeMiterlimit={10}
      strokeWidth={1.91}
    />
  </svg>
);
