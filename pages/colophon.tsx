import type { NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { PAGES } from '../src/utils/constants';

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
        <Link href='https://nikolovlazar.com/'>
          <a target='_blank'>Lazar Nikolov</a>
        </Link>
        {"'s "}
        design and developed by {process.env.NEXT_PUBLIC_SITE_NAME}.
      </p>

      <p>
        The tech stack is{' '}
        <Link href='https://nextjs.org'>
          <a target='_blank'>NextJS</a>
        </Link>{' '}
        (all pages statically generated),{' '}
        <Link href='https://planetscale.com/'>
          <a target='_blank'>PlanetScale</a>
        </Link>
        ,{' '}
        <Link href='https://mdxjs.com'>
          <a target='_blank'>MDX</a>
        </Link>
        ,{' '}
        <Link href='https://tailwindcss.com'>
          <a target='_blank'>Tailwind CSS</a>
        </Link>
        ,{' '}
        <Link href='https://www.typescriptlang.org'>
          <a target='_blank'>TypeScript</a>
        </Link>{' '}
        and it&apos;s deployed on{' '}
        <Link href='https://vercel.com'>
          <a target='_blank'>Vercel</a>
        </Link>
        .
      </p>

      <p>
        The source code can be found on{' '}
        <Link href='https://github.com/vladutilie/vladilie.ro'>
          <a target='_blank'>GitHub</a>
        </Link>
        .
      </p>
    </main>
  </>
);

export default Colophon;
