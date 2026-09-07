import { ReactNode } from 'react';

type Props = {
  /** Mono kicker above the title — a count, a category, anything short. */
  meta?: ReactNode;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
};

export const PageHeader: React.FC<Props> = ({ meta, title, lead, children }) => (
  <header className='border-hairline mb-12 border-b pb-10'>
    {meta ? (
      <div className='text-content/50 mb-4 font-mono text-[11.5px] tracking-[0.14em] uppercase'>{meta}</div>
    ) : null}

    <h1 className='my-0 text-5xl lg:text-6xl'>{title}</h1>

    {lead ? <p className='mt-5 mb-0 max-w-[60ch] text-lg leading-relaxed'>{lead}</p> : null}

    {children}
  </header>
);

/** The mono heading used for the groups inside a page. */
export const GroupHeading: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className='text-content/50 my-0 mb-5 font-mono text-[11.5px] font-medium tracking-[0.14em] uppercase'>
    {children}
  </h2>
);

/** The page shell: the same measure and rhythm as the homepage. */
export const Page: React.FC<{ children: ReactNode; narrow?: boolean }> = ({ children, narrow = false }) => (
  <main className={`mx-auto px-5 py-16 md:px-8 md:py-24 ${narrow ? 'max-w-3xl' : 'max-w-[1180px]'}`}>{children}</main>
);
