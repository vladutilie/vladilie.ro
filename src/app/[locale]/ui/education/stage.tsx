import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle: string;
  label: string;
  description: string | ReactNode;
  isEven?: boolean;
};

export const Stage: React.FC<Props> = ({ title, subtitle, label, description, isEven }) => (
  <>
    <div className={`w-full pl-4 sm:w-1/2 ${isEven ? 'sm:pl-0 sm:pr-2' : ''}`}>
      <div className={`relative w-full pb-12 pl-2 text-left ${isEven ? 'sm:pl-0 sm:pr-4 sm:text-right' : ''}`}>
        <span
          className={`bg- absolute -left-6 top-2 h-4 w-4 rounded-full border-4 border-blue-600 dark:bg-gray-950 ${
            isEven ? 'sm:-right-4 sm:left-auto' : ''
          }`}
        />
        <h3 className='my-0'>{title}</h3>
        <p className='mt-0 font-semibold text-gray-500'>{subtitle}</p>
        <span className='rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white'>{label}</span>
        <p className='text-gray-500'>{description}</p>
      </div>
    </div>

    <div className='w-1/2 px-4' />
    <div className='w-1/2 px-4' />
  </>
);
