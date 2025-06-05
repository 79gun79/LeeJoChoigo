import { useEffect, useRef } from 'react';
import { Mail, X } from 'lucide-react';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailVerificationModal({
  isOpen,
  onClose,
}: EmailVerificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ✅ 바깥 클릭 감지
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

  // ✅ ESC 키 감지
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative flex w-[280px] flex-col items-center rounded-[4px] bg-white p-6 drop-shadow-md"
      >
        <button className="text-gray4 absolute top-3 right-3" onClick={onClose}>
          <X className="h-5 w-5 cursor-pointer" />
        </button>
        <div className="h4 text-main mb-4 w-full text-center !font-bold">
          이메일 인증
        </div>
        <Mail className="text-main mb-[16px] h-16 w-16" />

        <p className="t4 mb-4 w-full text-left leading-none">
          이메일로 인증 링크가 발송 되었습니다. <br />
          인증 링크를 눌러 계정을 활성화 해주세요
        </p>
        <div className="t5 mb-[10px] w-full text-left">
          인증 메일이 오지 않았다면?
          <button className="text-sub1 ml-1 font-bold">인증 재발송</button>
        </div>
      </div>
    </div>
  );
}
