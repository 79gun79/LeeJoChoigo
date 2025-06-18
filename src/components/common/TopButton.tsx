import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function TopButton({ className }: { className?: string }) {
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
          `bg-main t4 fixed right-[0px] bottom-[20px] px-[13px] py-[5px] rounded-full text-white hover:scale-110 hover:shadow-lg md:right-[9px] md:bottom-[18px] md:px-[14px] md:py-[4px] lg:right-[23px] lg:bottom-[13px] lg:px-[19px] lg:py-[6px] ${isShow ? 'block' : 'hidden'}`,
          className,
        )}
      >
        Top
      </button>
    </>
  );
}
