import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import { PAGES } from '../src/utils/constants';

const links = [
  { link: 'https://nikolovlazar.com', name: 'Nikolov Lazar' },
  { link: 'https://jahir.dev', name: 'Jahir Fiquitiva' },
  { link: 'https://delba.dev', name: 'Delba de Oliveira' },
  { link: 'https://jimramsden.com', name: 'Jim Ramsden' }
];

const Colophon: NextPage = () => (
  <>
    <NextSeo
      title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.COLOPHON?.label].join(' - ')}
      description="The tech stack is NextJS (all pages statically generated), MDX, Tailwind CSS, TypeScript and it's deployed on Vercel."
    />

    <main className='container mx-auto flex max-w-3xl flex-col gap-y-3 px-4 pt-28'>
      <h2>Colophon</h2>
      <p>
        This website is inspired by{' '}
        <Link href='https://nikolovlazar.com/' target='_blank'>
          Lazar Nikolov
        </Link>
        {"'s "}
        design and developed by {process.env.NEXT_PUBLIC_SITE_NAME}.
      </p>

      <p>
        The tech stack is{' '}
        <Link href='https://nextjs.org' target='_blank'>
          NextJS
        </Link>{' '}
        (all pages statically generated),{' '}
        <Link href='https://planetscale.com/' target='_blank'>
          PlanetScale
        </Link>
        ,{' '}
        <Link href='https://mdxjs.com' target='_blank'>
          MDX
        </Link>
        ,{' '}
        <Link href='https://tailwindcss.com' target='_blank'>
          Tailwind CSS
        </Link>
        ,{' '}
        <Link href='https://www.typescriptlang.org' target='_blank'>
          TypeScript
        </Link>{' '}
        and it&apos;s deployed on{' '}
        <Link href='https://vercel.com' target='_blank'>
          Vercel
        </Link>
        .
      </p>

      <p>
        The source code can be found on{' '}
        <Link href='https://github.com/vladutilie/vladilie.ro' target='_blank'>
          GitHub
        </Link>
        .
      </p>

      <p>
        These sites also inspired parts of my website or people I admire and try to thank them by putting them on my
        &quot;wall of fame&quot; 🙏🏻.
      </p>

      <ul className='flex flex-wrap'>
        {links.map(({ link, name }) => (
          <li key={name} className='w-full p-2 md:w-1/3'>
            <Link href={link} target='_blank' className='flex items-center gap-2 hover:underline'>
              <Image
                alt={name}
                height={24}
                src={`https://unavatar.io/microlink/${link.replace('https://', '')}`}
                width={24}
              />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </>
);

export default Colophon;
