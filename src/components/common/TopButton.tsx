import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function TopButton({ className }: { className: string }) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <button
        onClick={moveTop}
        className={twMerge(
          `bg-main t4 fixed bottom-10 rounded-[9px] px-[11px] py-[6px] text-white hover:scale-110 hover:shadow-lg right-4 md:right-8 lg:right-14 xl:max-w-6xl xl:right-20 2xl:right-50 ${isShow ? 'block' : 'hidden'}`,
          className,
        )}
      >
        Top
      </button>
    </>
  );
}
