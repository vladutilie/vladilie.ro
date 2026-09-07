export const SectionLabel: React.FC<{ index: string; children: React.ReactNode }> = ({ index, children }) => (
  <h2 className='text-content/50 my-0 font-mono text-[11.5px] font-medium tracking-[0.14em] uppercase'>
    {index} — {children}
  </h2>
);
