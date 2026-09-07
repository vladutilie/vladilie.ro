export const SectionLabel: React.FC<{ index: string; children: React.ReactNode }> = ({ index, children }) => (
  <h2 className='my-0 font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-content/50'>
    {index} — {children}
  </h2>
);
