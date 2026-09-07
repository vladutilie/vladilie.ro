import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { Link, routing, usePathname } from '@/i18n/routing';

const notAllowedPaths = ['/blog/[slug]', '/projects/[slug]'];

export const LangChanger: React.FC = () => {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const isEnglish = routing.locales[0] === locale;

  return (
    <Link
      // @ts-ignore
      href={{ pathname, params }}
      locale={isEnglish ? 'ro' : 'en'}
      className={`text-content/60 hover:text-accent font-mono text-[11px] tracking-[0.06em] uppercase transition-colors ${
        notAllowedPaths.includes(pathname) ? 'pointer-events-none opacity-40' : ''
      }`}
      title={t('change-language-to', { lang: isEnglish ? 'română' : 'English' })}
    >
      {isEnglish ? 'RO' : 'EN'}
    </Link>
  );
};
