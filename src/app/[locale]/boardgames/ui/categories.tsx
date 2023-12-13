'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';

export const Categories: React.FC<{ list: string[] }> = ({ list }) => {
  const { push } = useRouter();
  const params = useSearchParams();
  const t = useTranslations('boardgames');

  return (
    <div className='flex w-full flex-wrap gap-2'>
      <button
        className={`rounded-md px-2 py-1 text-xs font-semibold uppercase ${
          !params.get('cat') ? 'bg-blue-500 text-white' : 'text-blue-500'
        }`}
        onClick={() => push({ pathname: '/boardgames', query: {} })}
      >
        {t('all-categories')}
      </button>
      {list.map((cat: string, idx: number) => (
        <button
          key={idx}
          className={`rounded-md px-2 py-1 text-xs font-semibold uppercase ${
            params.get('cat') === cat ? 'bg-blue-500 text-white' : 'text-blue-500'
          }`}
          onClick={() => push({ pathname: '/boardgames', query: { cat } })}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
