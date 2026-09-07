import { useTranslations } from 'next-intl';

export const Availability: React.FC = () => {
  const t = useTranslations('homepage.hero');
  const isAvailable = 'true' === process.env.NEXT_PUBLIC_AVAILABLE_FOR_WORK;

  return (
    <div className='inline-flex items-center gap-2.5 rounded-full border border-hairline px-3.5 py-[7px] font-mono text-[11.5px] uppercase tracking-[0.1em] text-content/85'>
      <span
        className={`h-[7px] w-[7px] animate-pulse-dot rounded-full ${isAvailable ? 'bg-accent' : 'bg-red-500'}`}
        aria-hidden
      />
      {isAvailable ? t('available') : t('not-available')}
    </div>
  );
};
