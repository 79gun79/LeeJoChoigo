import { useState } from 'react';
import { Check, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import LoginButton from '../components/atoms/LoginButton';
import wallpaper from '../assets/images/nubelson-fernandes-UcYBL5V0xWQ-unsplash.jpg';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router';
import { notify } from '../utils/customAlert';
import logo from '/dailyCote.png';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        if (error.code === 'validation_failed') {
          notify('이메일 또는 비밀번호를 입력해주세요.', 'warning');
        } else if (error.code === 'invalid_credentials') {
          notify('유효하지 않은 이메일 또는 비밀번호입니다', 'error');
        } else if (error.code === 'email_address_invalid') {
          notify('지원하지 않는 이메일 형식입니다.', 'warning');
        } else {
          notify('로그인이 실패했습니다.', 'error');
        }
        console.error('[로그인] 실패', error.code);
        return;
      }

      navigate('/');
    } catch (e) {
      notify('예상치 못한 오류가 발생했습니다.', 'error');
      console.error('[로그인] 예상치 못한 오류', e);
    }
  };

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
          <button
            className="text-main absolute top-0 left-10 cursor-pointer overflow-hidden"
            onClick={() => navigate('/')}
          >
            <img
              className="ml-[-8px] w-30 object-cover md:w-34 lg:w-38 dark:brightness-200"
              src={logo}
              alt="logo image"
            />
          </button>
          <div className="text-main h4 mb-[30px] text-center !font-bold">
            Login Your Account
          </div>

          <form className="w-full" action={handleLogin}>
            <div className="relative mb-[16px] md:mb-[20px]">
              <Mail className="text-gray3 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
              {isValidEmail(email) && (
                <Check className="text-green-info absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
              )}

              <input
                type="email"
                className="t5 border-gray3 placeholder:t5 h-[32px] w-full rounded-[4px] border bg-white pl-10 md:h-[40px]"
                placeholder="이메일 주소를 입력하세요"
                onChange={handleEmailInput}
                value={email}
              />
            </div>

            <div className="relative mb-[20px] md:mb-[32px]">
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
                onChange={handlePasswordInput}
                value={password}
              />
            </div>

            <button
              className="bg-main t3 mb-[30px] h-[32px] w-full cursor-pointer rounded-[4px] text-white transition hover:shadow-lg active:bg-black md:h-[40px]"
              type="submit"
            >
              로그인하기
            </button>
          </form>

          <div className="t5 mb-[30px] w-full text-left">
            계정이 없으신가요?{' '}
            <button
              className="text-sub1 cursor-pointer font-bold"
              onClick={() => navigate('/signup')}
            >
              회원가입
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
