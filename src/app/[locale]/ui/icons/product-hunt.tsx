import { SVGProps } from 'react';

export const ProductHunt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    className='fill-gray-600 dark:fill-gray-300'
    viewBox='0 0 24 24'
    {...props}
  >
    <g>
      <path fill='none' d='M0 0h24v24H0z' />
      <path
        fillRule='nonzero'
        d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1.334-8a1.5 1.5 0 0 0 0-3H10.5v3h2.834zm0-5a3.5 3.5 0 0 1 0 7H10.5v3h-2V7h4.834z'
      />
    </g>
  </svg>
);
