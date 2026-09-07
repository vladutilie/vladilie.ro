import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Pages } from '@/lib/constants';

export const ContactCta: React.FC<{ location: string }> = ({ location }) => {
  const t = useTranslations('homepage.contact');

  return (
    <section className='border-t border-hairline py-16 md:py-20 lg:pb-24 lg:pt-[88px]'>
      <div className='grid grid-cols-1 items-center gap-12 rounded-[4px] border border-hairline-strong bg-cta-surface p-8 text-paper md:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-16'>
        <div>
          <h2 className='my-0 mb-[18px] text-4xl leading-[1.05] tracking-[-0.04em] text-paper lg:text-[44px]'>
            {t('title')}
          </h2>
          <p className='my-0 max-w-[46ch] text-[17px] leading-[1.65] text-paper/70'>{t('body')}</p>
        </div>

        <div className='grid gap-3'>
          <Link
            href={`/${Pages.Contact}`}
            className='rounded-full bg-accent px-6 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-paper hover:text-ink'
          >
            {t('cta')}
          </Link>

          <a
            href={process.env.NEXT_PUBLIC_X}
            target='_blank'
            rel='noreferrer'
            className='rounded-full border border-paper/30 px-6 py-4 text-center text-base font-semibold text-paper transition-colors hover:border-accent hover:text-accent'
          >
            @vladilie94
          </a>

          <p className='my-0 mt-1.5 text-center font-mono text-xs text-paper/55'>{t('note', { location })}</p>
        </div>
      </div>
    </section>
  );
};
