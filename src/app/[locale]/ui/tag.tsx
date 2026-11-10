export const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className='border-hairline-strong text-content rounded-full border px-2.5 py-[5px] font-mono text-xs'>
    {label}
  </span>
);
