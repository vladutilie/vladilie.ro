'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { Logo } from './icons';
import { Pages } from '@/lib/constants';
import sal from '@/../public/images/anpc-sal.webp';
import sol from '@/../public/images/anpc-sol.webp';

export const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer className='bg-gray-50 dark:bg-slate-900'>
      <div className='container mx-auto grid max-w-7xl grid-cols-3 gap-4 px-4 py-16 md:py-20 2xl:py-24'>
        <div className='col-span-3 flex flex-col gap-y-4 md:col-span-1'>
          <Logo />
          <div>
            <p className='my-0 text-sm font-medium'>{process.env.NEXT_PUBLIC_COMPANY_NAME}</p>
            <p className='my-0 text-sm'>{process.env.NEXT_PUBLIC_ADDRESS}</p>
            <p className='my-0 text-sm'>{t('footer.vat-id', { vatId: process.env.NEXT_PUBLIC_VAT_ID })}</p>
            <p className='my-0 text-sm'>{t('footer.trade-reg-no', { regNo: process.env.NEXT_PUBLIC_REG_NO })}</p>
          </div>
        </div>

        <ul className='col-span-3 flex flex-col gap-y-2 md:col-span-1'>
          {Object.values(Pages).map((page) => (
            <li key={page}>
              <Link href={`/${page}`}>{t(`${page}.title`)}</Link>
            </li>
          ))}
        </ul>

        <ul className='col-span-3 flex flex-col gap-y-2 md:col-span-1'>
          <li>
            <Link href='/terms'>{t('terms.title')}</Link>
          </li>
          <li>
            <Link href='/privacy'>{t('privacy.title')}</Link>
          </li>
          <li>
            <a href='https://anpc.ro' target='_blank' className="after:content-['_↗']">
              ANPC
            </a>
          </li>
          <li>
            <a href='https://anpc.ro/ce-este-sal' target='_blank' aria-label={t('footer.sal-al')}>
              <Image
                src={sal}
                alt=''
                placeholder='blur'
                width={250}
                height={62}
                className='opacity-40 transition-opacity duration-300 hover:opacity-100'
              />
            </a>
          </li>
          <li>
            <a
              href='https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO'
              target='_blank'
              aria-label={t('footer.sol-al')}
            >
              <Image
                src={sol}
                alt=''
                placeholder='blur'
                width={250}
                height={62}
                className='opacity-40 transition-opacity duration-300 hover:opacity-100'
              />
            </a>
          </li>
        </ul>

        <p className='col-span-3 mt-4 border-t pt-4 text-center text-sm text-gray-500'>
          {`© 2019 - ${new Date().getFullYear()} · ${process.env.NEXT_PUBLIC_SITE_NAME} · ${t('footer.copyright')}`}
        </p>
      </div>
    </footer>
  );
};
