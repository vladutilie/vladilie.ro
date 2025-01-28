import { useTranslations } from 'next-intl';

export const Availability: React.FC = () => {
  const t = useTranslations('homepage.hero');
  const isAvailable = 'true' === process.env.NEXT_PUBLIC_AVAILABLE_FOR_WORK;

  return (
    <div className='flex items-center gap-x-2'>
      <div className='flex h-6 w-6 items-center justify-center'>
        <span className='relative flex h-3 w-3 items-center'>
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-500'} opacity-75`}
          />
          <span
            className={`relative inline-flex h-3 w-3 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-500'}`}
          />
        </span>
      </div>
      <p className='my-0'>{isAvailable ? t('available') : t('not-available')}</p>
    </div>
  );
};
