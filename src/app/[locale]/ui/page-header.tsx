import { ReactNode } from 'react';

type Props = {
  /** Mono kicker above the title — a count, a category, anything short. */
  meta?: ReactNode;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
};

export const PageHeader: React.FC<Props> = ({ meta, title, lead, children }) => (
  <header className='mb-12 md:mb-[52px]'>
    {meta ? (
      <div className='mb-3.5 font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase'>{meta}</div>
    ) : null}

    <h1 className='my-0 text-[clamp(40px,6vw,64px)] leading-[1.02] tracking-[-0.045em] text-balance'>{title}</h1>

    {lead ? (
      <p className='mt-5 mb-0 max-w-[60ch] text-lg leading-[1.6] text-content/80 md:text-[19px]'>{lead}</p>
    ) : null}

    {children}
  </header>
);

/** The mono heading used for the groups inside a page. */
export const GroupHeading: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className='my-0 mb-5 font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase'>{children}</h2>
);

/** The page shell: the same measure and rhythm as the homepage. */
export const Page: React.FC<{ children: ReactNode; narrow?: boolean }> = ({ children, narrow = false }) => (
  <main className={`mx-auto px-6 py-16 md:py-[88px] ${narrow ? 'max-w-3xl' : 'max-w-[1200px]'}`}>{children}</main>
);
