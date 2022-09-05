import { useCallback, useEffect, useState } from 'react';

const scrollToTop = () => {
  try {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    window.scrollTo(0, 0);
  }
};

const SCROLL_OFFSET = 287;

export const BackToTop: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const checkScrollTop = useCallback(() => {
    const scrolledDistance = window.scrollY || window.pageYOffset;
    const screenHeight = document.body.scrollHeight - window.screen.availHeight;
    try {
      setShowButton(
        scrolledDistance / screenHeight > 0.3 && scrolledDistance < screenHeight - Math.ceil(SCROLL_OFFSET / 2.5)
      );
    } catch (e) {}
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    checkScrollTop();

    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [checkScrollTop]);

  return (
    <button
      className={`fixed bottom-8 right-8 z-10 bg-blue-500/80 transition-all duration-300 hover:bg-blue-500 ${
        showButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <svg viewBox='0 0 24 24' role='presentation' className='h-5 w-5 fill-white md:hidden'>
        <path d='M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z' />
      </svg>
      <span className='hidden text-white md:inline'>Back to top</span>
    </button>
  );
};
