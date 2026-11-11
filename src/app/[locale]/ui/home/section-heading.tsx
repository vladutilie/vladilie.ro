type Props = {
  eyebrow: string;
  title: React.ReactNode;
  /** For sections on the ink background. */
  inverse?: boolean;
  className?: string;
};

/** Mono eyebrow + a large statement: the heading of every homepage section. */
export const SectionHeading: React.FC<Props> = ({ eyebrow, title, inverse = false, className = 'mb-[52px]' }) => (
  <>
    <h2
      className={`my-0 mb-3.5 font-mono text-xs font-medium tracking-[0.14em] uppercase ${inverse ? 'text-signal' : 'text-accent'}`}
    >
      {eyebrow}
    </h2>
    <p
      className={`my-0 max-w-[22ch] text-[clamp(30px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.035em] ${inverse ? 'text-paper' : 'text-content'} ${className}`}
    >
      {title}
    </p>
  </>
);

/** The small rounded mono tag used under case studies. */
export const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='rounded-full border border-hairline-strong px-2.5 py-[5px] font-mono text-xs text-content'>
    {children}
  </span>
);
