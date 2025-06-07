import { useState } from 'react';
import { Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import LoginButton from '../atoms/LoginButton';
import EmailVerificationModal from '../modals/EmailVertificationModal';
import wallpaper from '../../assets/images/nubelson-fernandes-UcYBL5V0xWQ-unsplash.jpg';

export default function Signup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-bg-white relative flex min-h-screen w-full overflow-hidden">
      {/* ✅ 왼쪽 배경 (데스크탑에서만 보임) */}
      <img
        src={wallpaper}
        className="absolute top-0 left-0 z-0 hidden h-full md:block"
      />

      {/* ✅ 오른쪽 폼 영역 */}
      <div className="bg-bg-white relative z-10 flex min-h-screen w-full items-center justify-center rounded-l-[20px] shadow-lg md:ml-auto md:w-2/3">
        <div className="flex w-full max-w-md flex-col items-center px-4">
          <div className="text-main h4 mb-[26px] text-center !font-bold">
            Create Your Account
          </div>

          <div className="relative mb-[16px] w-full md:mb-[20px]">
            <User className="text-gray3 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            <input
              className="t5 border-gray3 placeholder:t5 h-[32px] w-full rounded-[4px] border bg-white pl-10 md:h-[40px]"
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="relative mb-[16px] w-full md:mb-[20px]">
            <Mail className="text-gray3 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            <Check className="text-green-info absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
            <input
              type="email"
              className="t5 border-gray3 placeholder:t5 h-[32px] w-full rounded-[4px] border bg-white pl-10 md:h-[40px]"
              placeholder="이메일 주소를 입력하세요"
            />
          </div>

          <div className="relative mb-[20px] w-full md:mb-[32px]">
            <Lock className="text-gray3 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            {showPassword ? (
              <EyeOff
                className="text-gray4 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="text-gray4 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
            <input
              type={showPassword ? 'text' : 'password'}
              className="t5 border-gray3 placeholder:t5 h-[32px] w-full rounded-[4px] border bg-white pl-10 md:h-[40px]"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-main t3 mb-[30px] h-[32px] w-full cursor-pointer rounded-[4px] text-white transition hover:shadow-lg active:bg-black md:h-[40px]"
          >
            가입하기
          </button>

          <EmailVerificationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          <div className="t5 mb-[12px] w-full text-left">
            이미 계정이 있으신가요?{' '}
            <button className="text-sub1 cursor-pointer font-bold">
              로그인
            </button>
          </div>

          <div className="mb-[40px] flex w-full items-center justify-center">
            <span className="t1 text-gray3 font-bold">- OR -</span>
          </div>

          <LoginButton />
        </div>
      </div>
    </div>
  );
}
