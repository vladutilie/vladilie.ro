import { SVGProps } from 'react';
import Link from 'next/link';

import { Github, Instagram, LinkedIn, Polywork, Twitter, WordPress } from '../icons';

const links: { url: string; Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element }[] = [
  { url: process.env.NEXT_PUBLIC_GITHUB as string, Icon: Github },
  { url: process.env.NEXT_PUBLIC_INSTAGRAM as string, Icon: Instagram },
  { url: process.env.NEXT_PUBLIC_LINKEDIN as string, Icon: LinkedIn },
  { url: process.env.NEXT_PUBLIC_TWITTER as string, Icon: Twitter },
  { url: process.env.NEXT_PUBLIC_WORDPRESS as string, Icon: WordPress },
  { url: process.env.NEXT_PUBLIC_POLYWORK as string, Icon: Polywork }
];

export const Social: React.FC = () => {
  return (
    <ul className='flex gap-x-2'>
      {links.map(({ url, Icon }) => (
        <li key={url}>
          <Link href={url}>
            <a target='_blank'>
              <Icon className='transition-all duration-300 hover:fill-blue-500' />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
