import { useState } from 'react';
import { Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import LoginButton from '../atoms/LoginButton';
import EmailVerificationModal from '../modals/EmailVertificationModal';

export default function Signup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-bg-white flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-xs flex-col items-center">
        <h1 className="text-main h4 mb-[26px] text-center !font-bold">
          Create Your Account
        </h1>

        <div className="relative mb-[16px]">
          <User className="text-gray3 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
          <input
            className="t5 border-gray3 placeholder:t5 h-[32px] w-[260px] rounded-[4px] border bg-white pl-10"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="relative mb-[16px]">
          <Mail className="text-gray3 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
          <Check className="text-green-info absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
          <input
            type="email"
            className="t5 border-gray3 placeholder:t5 h-[32px] w-[260px] rounded-[4px] border bg-white pl-10"
            placeholder="이메일 주소를 입력하세요"
          />
        </div>

        <div className="relative mb-[20px]">
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
            className="t5 border-gray3 placeholder:t5 h-[32px] w-[260px] rounded-[4px] border bg-white pl-10"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-main t3 mb-[30px] h-[32px] w-[260px] cursor-pointer rounded-[4px] text-white transition hover:shadow-lg active:bg-black"
        >
          가입하기
        </button>
        <EmailVerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <div className="t5 mb-[12px] w-[260px] text-left">
          이미 계정이 있으신가요?{' '}
          <button className="text-sub1 cursor-pointer font-bold">로그인</button>
        </div>
        <div className="mb-[40px] flex items-center justify-center">
          <span className="t1 text-gray3 !font-bold">- OR -</span>
        </div>
        <LoginButton />
      </div>
    </div>
  );
}
