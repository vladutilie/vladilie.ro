import { SectionLabel } from './section-label';

type Props = {
  id?: string;
  index: string;
  label: string;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
};

/** The label-on-the-left section layout used across the homepage. */
export const SplitSection: React.FC<Props> = ({ id, index, label, lead, aside, children }) => (
  <section id={id} className='border-t border-hairline py-16 md:py-20 lg:py-[88px]'>
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-[72px]'>
      <div>
        <SectionLabel index={index}>{label}</SectionLabel>
        {lead && <p className='mt-[18px] text-[15px] leading-relaxed text-content/60'>{lead}</p>}
        {aside}
      </div>

      <div>{children}</div>
    </div>
  </section>
);
