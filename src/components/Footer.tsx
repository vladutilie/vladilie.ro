import Link from 'next/link';

import { Vercel } from '../../public/logos/technologies';

export const Footer: React.FC = () => {
  return (
    <footer className='container mx-auto mt-16 flex max-w-3xl flex-col gap-y-10 p-4'>
      <hr />

      <div className='flex w-full flex-wrap justify-between'>
        <ul className='w-1/2 md:w-auto'>
          <li>
            <Link href=''>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href=''>
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href=''>
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href=''>
              <a>Case studies</a>
            </Link>
          </li>
        </ul>

        <ul className='w-1/2 md:w-auto'>
          <li>
            <Link href={process.env.NEXT_PUBLIC_GITHUB as string}>
              <a target='_blank'>GitHub</a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_INSTAGRAM as string}>
              <a target='_blank'>Instagram</a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_LINKEDIN as string}>
              <a target='_blank'>LinkedIn</a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_NEO4J as string}>
              <a target='_blank'>Neo4j</a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_TWITTER as string}>
              <a target='_blank'>Twitter</a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_WORDPRESS as string}>
              <a target='_blank'>WordPress</a>
            </Link>
          </li>
        </ul>

        <ul className='w-1/2 md:w-auto'>
          <li>
            <Link href=''>
              <a>Books</a>
            </Link>
          </li>
          <li>
            <Link href=''>
              <a>Boardgames</a>
            </Link>
          </li>
          <li>
            <Link href=''>
              <a>Quotes</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className='flex flex-col items-center justify-between gap-y-2 md:flex-row'>
        <p className='text-sm text-gray-400'>
          &copy; {`${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        </p>
        <Link href='https://vercel.app'>
          <a className='flex items-center gap-x-1 text-xs font-semibold text-black'>
            Powered by <Vercel className='inline h-3' />
          </a>
        </Link>
      </div>
    </footer>
  );
};
