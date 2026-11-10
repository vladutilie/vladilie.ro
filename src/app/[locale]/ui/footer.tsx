'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import sal from '@/../public/images/anpc-sal.webp';
import sol from '@/../public/images/anpc-sol.webp';

const pages = ['/projects', '/blog', '/contact', '/uses', '/books', '/boardgames', '/locations', '/colophon'] as const;
const legal = ['/terms', '/privacy'] as const;

const linkClasses = 'text-content/85 transition-colors hover:text-accent';

export const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer className='border-hairline border-t'>
      <div className='mx-auto flex max-w-[1200px] flex-wrap justify-between gap-8 px-6 py-12 text-sm'>
        <p className='text-content/75 my-0 font-mono text-[12.5px] leading-[1.8]'>
          {process.env.NEXT_PUBLIC_COMPANY_NAME}
          <br />
          {t('footer.vat-id', { vatId: process.env.NEXT_PUBLIC_VAT_ID! })} ·{' '}
          {t('footer.trade-reg-no', { regNo: process.env.NEXT_PUBLIC_REG_NO! })}
          <br />
          {process.env.NEXT_PUBLIC_ADDRESS}
        </p>

        <nav aria-label={t('footer.nav-al')} className='flex max-w-[640px] flex-wrap content-start gap-x-6 gap-y-2.5'>
          {pages.map((page) => (
            <Link key={page} href={page} className={linkClasses}>
              {t(`${page.slice(1)}.title`)}
            </Link>
          ))}
          {legal.map((page) => (
            <Link key={page} href={page} className={linkClasses}>
              {t(`${page.slice(1)}.title`)}
            </Link>
          ))}
          <a href='https://anpc.ro' target='_blank' rel='noreferrer' className={linkClasses}>
            ANPC
          </a>
          <a href={process.env.NEXT_PUBLIC_X} target='_blank' rel='noreferrer' className={linkClasses}>
            @vladilie94
          </a>
        </nav>
      </div>

      <div className='mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 pb-10'>
        <span className='text-content/70 font-mono text-xs'>
          {t('footer.copyright', { year: new Date().getFullYear(), siteName: process.env.NEXT_PUBLIC_SITE_NAME! })}
        </span>

        <div className='flex flex-wrap gap-2'>
          <a href='https://anpc.ro/ce-este-sal' target='_blank' rel='noreferrer' aria-label={t('footer.sal-al')}>
            <Image
              src={sal}
              alt=''
              placeholder='blur'
              width={160}
              height={40}
              className='opacity-40 transition-opacity duration-300 hover:opacity-100'
            />
          </a>
          <a
            href='https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO'
            target='_blank'
            rel='noreferrer'
            aria-label={t('footer.sol-al')}
          >
            <Image
              src={sol}
              alt=''
              placeholder='blur'
              width={160}
              height={40}
              className='opacity-40 transition-opacity duration-300 hover:opacity-100'
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
