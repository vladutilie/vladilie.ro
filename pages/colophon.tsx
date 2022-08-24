import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Colophon: NextPage = () => (
  <>
    <Head>
      <title>{[process.env.NEXT_PUBLIC_SITE_NAME, 'Colophon'].join(' - ')}</title>
    </Head>

    <main className='container mx-auto flex max-w-3xl flex-col gap-y-3 px-4'>
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
        <Link href='https://tailwindcss.com'>
          <a target='_blank'>TailwindCSS</a>
        </Link>
        ,{' '}
        <Link href='https://www.typescriptlang.org'>
          <a target='_blank'>TypeScript</a>
        </Link>{' '}
        and it&apos;s deployed on Vercel.
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
