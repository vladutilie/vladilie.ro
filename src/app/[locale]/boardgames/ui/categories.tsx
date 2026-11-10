'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/routing';

export const Categories: React.FC<{ list: string[] }> = ({ list }) => {
  const { push } = useRouter();
  const params = useSearchParams();
  const t = useTranslations('boardgames');

  const pill = (isActive: boolean): string =>
    `cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
      isActive
        ? 'border-signal bg-signal text-ink'
        : 'border-hairline-strong text-content/70 hover:border-signal hover:text-accent'
    }`;

  return (
    <div className='flex w-full flex-wrap gap-2'>
      <button className={pill(!params.get('cat'))} onClick={() => push({ pathname: '/boardgames', query: {} })}>
        {t('all-categories')}
      </button>

      {list.map((cat: string) => (
        <button
          key={cat}
          className={pill(params.get('cat') === cat)}
          onClick={() => push({ pathname: '/boardgames', query: { cat } })}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
