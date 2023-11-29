export const LoadingDots: React.FC = () => (
  <div className='inline text-xs text-gray-400'>
    <span className='animate-[loading_1.4s_ease-in-out_infinite] rounded-full '>&bull;</span>
    <span className='animate-[loading_1.4s_ease-in-out_0.2s_infinite] rounded-full'>&bull;</span>
    <span className='animate-[loading_1.4s_ease-in-out_0.4s_infinite] rounded-full'>&bull;</span>
  </div>
);
