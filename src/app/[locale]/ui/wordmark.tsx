export const Wordmark: React.FC<{ withName?: boolean }> = ({ withName = true }) => (
  <span className='text-content flex items-center gap-2.5 text-base font-semibold tracking-tight'>
    <span className='border-accent bg-ink text-paper grid h-[26px] w-[26px] place-items-center rounded-[7px] border-[1.5px] font-mono text-xs font-medium'>
      VI
    </span>
    {withName && <span>Vlad Ilie</span>}
  </span>
);
