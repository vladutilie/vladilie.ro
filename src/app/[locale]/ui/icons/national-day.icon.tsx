import { SVGProps } from 'react';

export const NationalDay = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={30} height={30} fill='none' viewBox='0 -4 28 28' {...props}>
    <g clipPath='url(#a)'>
      <rect width={28} height={20} fill='#fff' rx={2} />
      <mask
        id='b'
        width={28}
        height={20}
        x={0}
        y={0}
        maskUnits='userSpaceOnUse'
        style={{
          maskType: 'alpha'
        }}
      >
        <rect width={28} height={20} fill='#fff' rx={2} />
      </mask>
      <g mask='url(#b)'>
        <path fill='#E5253D' d='M13.333 0H28v20H13.333z' />
        <path fill='#0A3D9C' fillRule='evenodd' d='M0 20h9.333V0H0v20Z' clipRule='evenodd' />
        <path fill='#FFD955' fillRule='evenodd' d='M9.333 20h9.334V0H9.333v20Z' clipRule='evenodd' />
      </g>
    </g>
    <defs>
      <clipPath id='a'>
        <rect width={28} height={20} fill='#fff' rx={2} />
      </clipPath>
    </defs>
  </svg>
);
