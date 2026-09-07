export const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className='border-hairline text-content/60 rounded-[3px] border px-2.5 py-1 font-mono text-[11px]'>
    {label}
  </span>
);
