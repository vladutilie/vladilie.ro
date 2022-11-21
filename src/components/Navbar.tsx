import Link from 'next/link';
import { useCallback, useState } from 'react';

import { BurgerMenu } from '../icons';
import { Page } from '../types';
import { PAGES } from '../utils/constants';

const pages: Page[] = [
  { href: PAGES.ABOUT?.href as string, label: PAGES.ABOUT?.label as string },
  { href: PAGES.BLOG?.href as string, label: PAGES.BLOG?.label as string },
  { href: PAGES.CASE_STUDIES?.href as string, label: PAGES.CASE_STUDIES?.label as string }
];
export const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(() => {
    setMenuOpen((value) => {
      if (!value) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = '';
      }

      return !value;
    });
  }, []);

  return (
    <div className='fixed left-1/2 top-3 z-20 w-full max-w-3xl -translate-x-1/2 px-4'>
      <nav
        className={`flex w-full max-w-3xl flex-col items-center justify-between gap-y-4 rounded-2xl bg-zinc-100/95 px-4 py-3 shadow-surface-glass backdrop-blur will-change-transform md:flex-row [@supports(backdrop-filter:blur(0px))]:bg-white/[3%]`}
      >
        <div className='flex w-full items-center justify-between md:w-auto'>
          <Link href='/' className='inline'>
            <h3>{process.env.NEXT_PUBLIC_SITE_NAME?.split(' ')[0]}</h3>
          </Link>

          <button aria-label='Collapse menu' name='Collapse menu' className='md:hidden' onClick={toggleMobileMenu}>
            <BurgerMenu className='w-5 fill-gray-600' />
          </button>
        </div>

        <ul className='hidden gap-x-4 font-quicksand font-semibold md:flex md:text-lg'>
          {pages.map(({ href, label }: Page) => (
            <li key={label}>
              <Link href={href} className='hover:underline'>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`fixed -top-3 left-0 flex h-screen w-full items-center justify-center bg-zinc-100/90 text-xl transition-transform md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={toggleMobileMenu}
      >
        <ul className='space-y-4 font-quicksand font-semibold'>
          {pages.map(({ href, label }: Page) => (
            <li key={label} className='border-b border-gray-600 px-8 pb-4 text-center'>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
