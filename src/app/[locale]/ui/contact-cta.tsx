import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Pages } from '@/lib/constants';

export const ContactCta: React.FC<{ location: string }> = ({ location }) => {
  const t = useTranslations('homepage.contact');

  return (
    <section className='border-hairline border-t py-16 md:py-20 lg:pt-[88px] lg:pb-24'>
      <div className='border-hairline-strong bg-cta-surface text-paper grid grid-cols-1 items-center gap-12 rounded-[4px] border p-8 md:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-16'>
        <div>
          <h2 className='text-paper my-0 mb-[18px] text-4xl leading-[1.05] tracking-[-0.04em] lg:text-[44px]'>
            {t('title')}
          </h2>
          <p className='text-paper/70 my-0 max-w-[46ch] text-[17px] leading-[1.65]'>{t('body')}</p>
        </div>

        <div className='grid gap-3'>
          <Link
            href={`/${Pages.Contact}`}
            className='bg-accent hover:bg-paper hover:text-ink rounded-full px-6 py-4 text-center text-base font-semibold text-white transition-colors'
          >
            {t('cta')}
          </Link>

          <a
            href={process.env.NEXT_PUBLIC_X}
            target='_blank'
            rel='noreferrer'
            className='border-paper/30 text-paper hover:border-accent hover:text-accent rounded-full border px-6 py-4 text-center text-base font-semibold transition-colors'
          >
            @vladilie94
          </a>

          <p className='text-paper/55 my-0 mt-1.5 text-center font-mono text-xs'>{t('note', { location })}</p>
        </div>
      </div>
    </section>
  );
};
