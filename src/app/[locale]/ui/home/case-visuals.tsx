import { useTranslations } from 'next-intl';

/*
  The illustrations next to each case study. They're decorative (aria-hidden on
  the wrapper) and keep fixed colours, like product screenshots would.
*/

export const MaslinescuVisual: React.FC = () => {
  const t = useTranslations('homepage.work.visuals.maslinescu');

  return (
    <>
      <div className='rounded-[10px] bg-[#f6f1e4] p-5 text-[#1d2414]'>
        <div className='mb-2.5 flex justify-between text-[13px]'>
          <strong>Club Măslinescu®</strong>
          <span className='font-mono'>{t('tier')}</span>
        </div>
        <div className='text-[34px] font-extrabold tracking-[-0.03em]'>
          1.240 <span className='text-[15px] font-semibold'>{t('spent')}</span>
        </div>
        <div className='mt-3.5 mb-2 h-2 rounded-full bg-[#ddd5c0]'>
          <div className='h-full w-[62%] rounded-full bg-[#6b7f2a]' />
        </div>
        <div className='text-[12.5px] opacity-80'>{t('progress')}</div>
      </div>

      <div className='rounded-[10px] bg-ink px-4 py-3.5 font-mono text-xs leading-[1.9] text-[#e9e7e1]'>
        <div>
          <span className='text-amber-400'>warn</span> {t('log-stock')}
        </div>
        <div>
          <span className='text-green-400'>ok&nbsp;&nbsp;</span> {t('log-mail')}
        </div>
      </div>
    </>
  );
};

export const TablouriVisual: React.FC = () => {
  const t = useTranslations('homepage.work.visuals.tablouri');

  return (
    <div className='w-full max-w-[380px] rounded-xl bg-white p-[18px] text-[#18151f] shadow-[0_20px_40px_-24px_rgba(40,20,80,.45)]'>
      <div className='mb-3.5 grid aspect-4/3 place-items-center rounded-md bg-linear-135 from-amber-500 via-pink-500 to-indigo-500 text-[13px] font-semibold text-white'>
        {t('photo')} · 60 × 40 cm
      </div>
      <div className='mb-2 text-xs font-bold'>{t('size')}</div>
      <div className='mb-3 flex gap-1.5 text-xs'>
        <span className='rounded-md border border-[#ddd] px-[9px] py-[5px]'>30×20</span>
        <span className='rounded-md border-2 border-[#18151f] px-2 py-1 font-bold'>60×40</span>
        <span className='rounded-md border border-[#ddd] px-[9px] py-[5px]'>90×60</span>
      </div>
      <div className='mb-2 text-xs font-bold'>{t('options')}</div>
      <div className='mb-3.5 flex flex-wrap gap-1.5 text-xs'>
        {(['finish', 'filter', 'design'] as const).map((option) => (
          <span key={option} className='rounded-md bg-[#f2eefa] px-[9px] py-[5px]'>
            {t(option)}
          </span>
        ))}
      </div>
      <div className='rounded-lg bg-[#18151f] p-[11px] text-center text-[13px] font-semibold text-white'>
        {t('add-to-cart')}
      </div>
    </div>
  );
};

const uploads = [
  { name: 'IMG_2041.jpg', pct: 100 },
  { name: 'IMG_2042.jpg', pct: 100 },
  { name: 'VID_0388.mp4', pct: 64 }
];

export const LumeaVisual: React.FC = () => {
  const t = useTranslations('homepage.work.visuals.lumea');

  return (
    <div className='w-full max-w-[300px] rounded-[22px] bg-white p-[18px] text-[#0f1d22] shadow-[0_20px_40px_-20px_rgba(0,0,0,.5)]'>
      <div className='mb-1 text-xs opacity-70'>Lumea BookTruck · {t('volunteer')}</div>
      <div className='mb-3.5 text-[17px] font-extrabold'>{t('trip')}</div>

      {uploads.map(({ name, pct }) => (
        <div key={name} className='mb-3'>
          <div className='mb-[5px] flex justify-between text-[12.5px]'>
            <span>{name}</span>
            <span className='font-mono'>{pct}%</span>
          </div>
          <div className='h-1.5 rounded-full bg-[#e4ecef]'>
            <div className='h-full rounded-full bg-signal' style={{ width: `${pct}%` }} />
          </div>
        </div>
      ))}

      <div className='mt-1.5 rounded-lg bg-[#eef5f7] px-2.5 py-2 font-mono text-[11.5px]'>
        → Drive / 2026 / {t('folder')}
      </div>
    </div>
  );
};
