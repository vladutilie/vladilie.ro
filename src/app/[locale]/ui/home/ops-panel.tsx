import { useTranslations } from 'next-intl';

// Orders per hour over the last day — illustrative, the 19th bar is "now".
const heights = [22, 18, 14, 10, 9, 12, 20, 34, 52, 61, 58, 66, 72, 64, 55, 60, 70, 84, 92, 78, 63, 48, 36, 28];

const logs = [
  { key: 'checkout', tag: 'ok', color: 'text-green-400' },
  { key: 'stock', tag: 'warn', color: 'text-amber-400' },
  { key: 'mail', tag: 'ok', color: 'text-green-400' },
  { key: 'backup', tag: 'info', color: 'text-blue-300' }
] as const;

/** The hero illustration: a dark "shop-ops" monitoring panel. Same colours in both themes. */
export const OpsPanel: React.FC = () => {
  const t = useTranslations('homepage.hero.panel');

  return (
    <figure className='m-0 min-w-0 flex-[1_1_400px]'>
      <div className='bg-ink overflow-hidden rounded-[14px] border border-white/8 text-[#e9e7e1] shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)]'>
        <div className='flex items-center justify-between border-b border-white/9 px-[18px] py-3.5 font-mono text-xs'>
          <span aria-hidden className='flex gap-1.5'>
            {[0, 1, 2].map((dot) => (
              <span key={dot} className='h-2.5 w-2.5 rounded-full bg-[#3a3d45]' />
            ))}
          </span>
          <span className='opacity-75'>{t('title')}</span>
          <span className='text-green-400'>● {t('healthy')}</span>
        </div>

        <div className='px-[18px] pt-5 pb-2'>
          <div className='mb-3 flex justify-between text-[13px] opacity-75'>
            <span>{t('chart')}</span>
            <span className='font-mono'>Grafana + Loki</span>
          </div>

          <div aria-hidden className='flex h-[120px] items-end gap-[5px]'>
            {heights.map((height, idx) => (
              <span
                key={idx}
                className={`flex-1 rounded-t-[3px] ${18 === idx ? 'bg-signal' : 'bg-[#e9e7e1]/32'}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className='mt-3 border-t border-white/9 px-[18px] pt-2.5 pb-[18px] font-mono text-[12.5px] leading-loose'>
          {logs.map(({ key, tag, color }) => (
            <div key={key} className='flex gap-3 overflow-hidden whitespace-nowrap'>
              <span className={`${color} inline-block w-[4ch] shrink-0`}>{tag}</span>
              <span className='truncate opacity-82'>{t(`logs.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>

      <figcaption className='text-content/72 mt-3 text-[13.5px]'>{t('caption')}</figcaption>
    </figure>
  );
};
