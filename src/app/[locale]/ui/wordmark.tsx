export const Wordmark: React.FC<{ withName?: boolean }> = ({ withName = true }) => (
  <span className='text-content flex items-center gap-2.5 text-[17px] font-bold tracking-[-0.02em]'>
    <span aria-hidden className='inline-flex items-end text-2xl leading-[0.8] font-extrabold tracking-[-0.06em]'>
      VI
      <span className='bg-signal ml-0.5 h-1.5 w-1.5' />
    </span>
    {withName && <span>Vlad Ilie</span>}
  </span>
);
