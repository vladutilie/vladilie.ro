export const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className='rounded-full border border-hairline-strong px-2.5 py-[5px] font-mono text-xs text-content'>
    {label}
  </span>
);
