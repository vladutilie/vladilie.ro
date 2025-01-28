import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { Link, routing, usePathname } from '@/i18n/routing';

const notAllowedPaths = ['/blog/[slug]', '/projects/[slug]'];

export const LangChanger: React.FC = () => {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className='flex items-center justify-between'>
      <span className='md:hidden'>{t('change-language')}</span>

      <Link
        // @ts-ignore
        href={{ pathname, params }}
        locale={routing.locales[0] === locale ? 'ro' : 'en'}
        className={`px-2 text-2xl md:px-0 ${notAllowedPaths.includes(pathname) ? 'pointer-events-none grayscale' : ''}`}
        title={t('change-language-to', { lang: routing.locales[0] === locale ? 'română' : 'English' })}
      >
        {routing.locales[0] === locale ? '🇷🇴' : '🇺🇸'}
      </Link>
    </div>
  );
};
