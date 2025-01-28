import { ReactNode, JSX } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

export const Quote: React.FC = () => {
  const t = useTranslations('homepage.sw-l10n');

  return (
    <p className='text-center'>
      {t.rich('quote', {
        contact: (chunk: ReactNode): JSX.Element => (
          <Link
            href='/contact'
            className='animate-text-bg text-clip bg-gradient-to-r from-blue-600 via-gray-600 to-green-500 bg-[length:400%] bg-clip-text text-lg font-semibold text-transparent hover:text-transparent'
          >
            {chunk}
          </Link>
        )
      })}
    </p>
  );
};
