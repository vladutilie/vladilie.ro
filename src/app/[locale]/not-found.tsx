import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import { Page } from './ui/page-header';

export default async function NotFound() {
  const t = await getTranslations('not-found');

  return (
    <Page narrow>
      <div className='border-hairline flex flex-col items-start gap-6 border-y py-20'>
        <span className='text-accent font-mono text-[11.5px] tracking-[0.14em] uppercase'>404</span>
        <h1 className='my-0 text-5xl lg:text-6xl'>{t('title')}</h1>
        <p className='my-0 max-w-[50ch] text-lg leading-relaxed'>{t('description')}</p>

        <Link
          href='/'
          className='border-hairline-strong text-content hover:border-signal hover:text-accent mt-2 rounded-full border px-6 py-3 text-[15px] font-semibold transition-colors'
        >
          {t('back-home')}
        </Link>
      </div>
    </Page>
  );
}
