export const Wordmark: React.FC<{ withName?: boolean }> = ({ withName = true }) => (
  <span className='flex items-center gap-2.5 text-base font-semibold tracking-tight text-content'>
    <span className='grid h-[26px] w-[26px] place-items-center rounded-[7px] border-[1.5px] border-accent bg-ink font-mono text-xs font-medium text-paper'>
      VI
    </span>
    {withName && <span>Vlad Ilie</span>}
  </span>
);
