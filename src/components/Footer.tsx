import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { Page } from '../types';
import { PAGES, SOCIAL_LINKS } from '../utils/constants';

const firstCol: Page[] = [
  PAGES.HOME as Page,
  PAGES.ABOUT as Page,
  PAGES.BLOG as Page,
  PAGES.CASE_STUDIES as Page,
  PAGES.COLOPHON as Page
];
const secondCol: Page[] = [
  PAGES.USES as Page,
  PAGES.BOOKS as Page,
  PAGES.INSPIRATION as Page,
  PAGES.BOARDGAMES as Page
];
const thirdCol: Page[] = [
  SOCIAL_LINKS.GITHUB as Page,
  SOCIAL_LINKS.INSTAGRAM as Page,
  SOCIAL_LINKS.LINKEDIN as Page,
  SOCIAL_LINKS.TWITTER as Page,
  SOCIAL_LINKS.WORDPRESS as Page,
  SOCIAL_LINKS.POLYWORK as Page
];

export const Footer: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <footer className='container mx-auto mt-16 flex max-w-3xl flex-col gap-y-10 p-4'>
      <hr />

      <div className='flex w-full flex-wrap justify-between gap-y-2'>
        <ul className='w-1/2 md:w-auto'>
          {firstCol.map(({ href, label }: Page, idx: number) => (
            <li key={idx}>
              <Link href={href}>
                <a className={`${pathname === href ? 'text-blue-400' : ''}`}>{label}</a>
              </Link>
            </li>
          ))}
        </ul>

        <ul className='w-1/2 md:w-auto'>
          {secondCol.map(({ href, label }: Page, idx: number) => (
            <li key={idx}>
              <Link href={href}>
                <a className={`${pathname === href ? 'text-blue-400' : ''}`}>{label}</a>
              </Link>
            </li>
          ))}
        </ul>

        <ul className='w-1/2 md:w-auto'>
          {thirdCol.map(({ href, label }: Page, idx: number) => (
            <li key={idx}>
              <Link href={href}>
                <a target='_blank'>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col items-center justify-between gap-y-2 md:flex-row'>
        <p className='text-sm text-gray-400'>
          &copy; {`${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        </p>
        <Link href='https://vercel.app'>
          <a className='flex items-center gap-x-1 text-xs font-semibold text-black' target='_blank'>
            Powered by{' '}
            <Image
              alt='Vercel'
              className='inline h-3'
              height={12}
              src='/assets/images/vercel-logotype.svg'
              width={53}
            />
          </a>
        </Link>
      </div>
    </footer>
  );
};
