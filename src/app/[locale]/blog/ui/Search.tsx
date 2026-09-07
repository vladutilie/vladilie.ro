'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const Search: React.FC = () => {
  const t = useTranslations('blog');
  const [query, setQuery] = useState('');

  useEffect(() => {
    console.log(window.location.search);
  }, []);

  const handleInput = (value: string): void => {
    setQuery(value);
  };

  return (
    <input
      type='text'
      autoFocus
      placeholder={t('search-placeholder')}
      className='bg-surface-raised dark:bg-surface-raised h-10 rounded-md px-2 py-1 outline-hidden'
      value={query}
      onChange={({ currentTarget }) => handleInput(currentTarget.value)}
    />
  );
};
