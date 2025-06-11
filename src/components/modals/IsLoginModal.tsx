import { X } from 'lucide-react';
import ModalButton from '../atoms/ModalButton';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

interface IsLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IsLoginModal({ isOpen, onClose }: IsLoginModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  // 바깥 클릭 감지
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC 키 감지
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
          ref={modalRef}
          className="relative flex h-[190px] w-[280px] flex-col items-center justify-center gap-5 rounded-sm bg-white px-[30px] pt-[20px] pb-[25px] drop-shadow-md md:h-[240px] md:w-[360px] md:gap-10 md:px-[40px] md:pt-[30px] md:pb-[40px]"
        >
          <button
            onClick={onClose}
            className="text-gray4 absolute top-2 right-2 md:top-4 md:right-4"
          >
            <X className="h-6 w-6 cursor-pointer" />
          </button>
          <div className="h4 md:h3 text-main w-full text-center font-bold">
            Oops!
          </div>
          <p className="t4 w-full text-left !font-normal">
            로그인이 필요한 서비스입니다.
            <br />
            로그인 하시겠습니까?
          </p>
          <div className="flex w-full flex-row justify-between">
            <ModalButton onClick={onClose}>아니오</ModalButton>
            <ModalButton
              onClick={() => navigate('/login')}
              className="bg-sub1 hover:bg-main"
            >
              예
            </ModalButton>
          </div>
        </div>
      </div>
    </>
  );
}
