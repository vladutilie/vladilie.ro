import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, locales, usePathname } from '@/navigation';

export const LangChanger: React.FC = () => {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className='flex items-center justify-between'>
      <span className='transition-colors md:hidden'>{t('change-language')}</span>

      <Link
        // @ts-ignore
        href={{ pathname, params }}
        locale={locales[0] === locale ? 'ro' : 'en'}
        className='px-2 text-2xl md:px-0'
        title={t('change-language-to', { lang: locales[0] === locale ? 'română' : 'English' })}
      >
        {locales[0] === locale ? '🇷🇴' : '🇺🇸'}
      </Link>
    </div>
  );
};
