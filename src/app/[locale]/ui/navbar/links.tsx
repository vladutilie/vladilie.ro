import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

import { ThemeSwitcher } from '../theme-switcher';

export const Links: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const t = useTranslations('navbar');

  // TODO: Replace Link with simple <a> where there is no navigation between pages.
  return (
    <ul
      className={`flex-col gap-x-6 after:absolute after:left-0 after:w-full after:border-b after:dark:border-gray-600 md:flex-row md:after:hidden ${
        isMobile ? 'flex gap-y-4 overflow-y-auto text-base' : 'hidden items-center md:flex'
      }`}
    >
      <li className='pt-4 md:pt-0'>
        <Link href='/' className='text-inherit'>
          {t('about')}
        </Link>
      </li>
      <li>
        <Link href='/' className='text-inherit'>
          {t('education')}
        </Link>
      </li>
      <li>
        <Link href='/' className='text-inherit'>
          {t('skills')}
        </Link>
      </li>
      <li>
        <Link href='/blog' className='text-inherit'>
          {t('projects')}
        </Link>
      </li>
      <li>
        <Link href='/' className='text-inherit'>
          {t('services')}
        </Link>
      </li>
      <li>
        <Link href='/' className='text-inherit'>
          {t('contact')}
        </Link>
      </li>
      <li className='hidden h-6 w-0.5 bg-gray-100 md:block' />
      <li className='before:absolute before:left-0 before:w-full before:border-b before:dark:border-gray-600 md:before:hidden'>
        <ThemeSwitcher />
      </li>
      <li>L</li>
    </ul>
  );
};
