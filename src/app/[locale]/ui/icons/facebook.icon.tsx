import { SVGProps } from 'react';

export const Facebook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    className='icon line-color'
    data-name='Line Color'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      d='M14 7h4V3h-4a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1Z'
      className='stroke-gray-600 dark:stroke-gray-300'
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2
      }}
    />
  </svg>
);
