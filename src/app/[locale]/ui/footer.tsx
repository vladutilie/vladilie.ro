'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Wordmark } from './wordmark';
import sal from '@/../public/images/anpc-sal.webp';
import sol from '@/../public/images/anpc-sol.webp';

const columns = [
  { key: 'site', pages: ['/projects', '/blog', '/contact', '/locations'] },
  { key: 'personal', pages: ['/uses', '/books', '/boardgames', '/colophon'] }
] as const;

const linkClasses = 'text-content/75 transition-colors hover:text-accent';

export const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer className='border-hairline border-t'>
      <div className='mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 pt-14 pb-10 sm:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]'>
        <div>
          <div className='mb-4'>
            <Wordmark />
          </div>

          <p className='text-content/55 my-0 font-mono text-xs leading-[1.8]'>
            {process.env.NEXT_PUBLIC_COMPANY_NAME}
            <br />
            {process.env.NEXT_PUBLIC_ADDRESS}
            <br />
            {t('footer.vat-id', { vatId: process.env.NEXT_PUBLIC_VAT_ID! })}
            <br />
            {t('footer.trade-reg-no', { regNo: process.env.NEXT_PUBLIC_REG_NO! })}
          </p>
        </div>

        {columns.map(({ key, pages }) => (
          <div key={key}>
            <div className='text-content/45 mb-4 font-mono text-[11px] tracking-[0.12em] uppercase'>
              {t(`footer.${key}`)}
            </div>

            <ul className='grid gap-2.5 text-[14.5px]'>
              {pages.map((page) => (
                <li key={page}>
                  <Link href={page} className={linkClasses}>
                    {t(`${page.slice(1)}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className='text-content/45 mb-4 font-mono text-[11px] tracking-[0.12em] uppercase'>
            {t('footer.legal')}
          </div>

          <ul className='grid gap-2.5 text-[14.5px]'>
            <li>
              <Link href='/terms' className={linkClasses}>
                {t('terms.title')}
              </Link>
            </li>
            <li>
              <Link href='/privacy' className={linkClasses}>
                {t('privacy.title')}
              </Link>
            </li>
            <li>
              <a href='https://anpc.ro' target='_blank' rel='noreferrer' className={linkClasses}>
                ANPC
              </a>
            </li>
            <li className='mt-2 flex flex-col gap-2'>
              <a href='https://anpc.ro/ce-este-sal' target='_blank' rel='noreferrer' aria-label={t('footer.sal-al')}>
                <Image
                  src={sal}
                  alt=''
                  placeholder='blur'
                  width={200}
                  height={50}
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
                  width={200}
                  height={50}
                  className='opacity-40 transition-opacity duration-300 hover:opacity-100'
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='border-hairline text-content/50 mx-auto flex max-w-[1180px] flex-col justify-between gap-3 border-t px-5 pt-5 pb-12 font-mono text-[11.5px] sm:flex-row md:px-8'>
        <span>
          {t('footer.copyright', { year: new Date().getFullYear(), siteName: process.env.NEXT_PUBLIC_SITE_NAME! })}
        </span>
        <span>{t('footer.built-with')}</span>
      </div>
    </footer>
  );
};
