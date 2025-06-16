import { useState } from 'react';
import { Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import LoginButton from '../components/atoms/LoginButton';
import EmailVerificationModal from '../components/modals/EmailVertificationModal';
import wallpaper from '../assets/images/nubelson-fernandes-UcYBL5V0xWQ-unsplash.jpg';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router';
import { notify } from '../utils/customAlert';

export default function Signup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isValidName = (name: string) => {
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,16}$/;
    return nameRegex.test(name);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    try {
      const { data, error: duplicateErr } = await supabase
        .from('user')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (duplicateErr) {
        notify('예상치 못한 오류가 발생했습니다.', 'error');
        console.error('[회원가입] 실패', duplicateErr.code);
        return;
      }

      if (data) {
        notify('이미 가입된 이메일입니다.', 'info');
        navigate('/login');
        return;
      } else {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              name: name,
              avatar_url: null,
            },
          },
        });

        if (error) {
          if (error.code === 'user_already_exists') {
            notify('이미 가입된 이메일입니다.', 'info');
          } else if (error.code === 'email_address_invalid') {
            notify('지원하지 않는 이메일 형식입니다.', 'warning');
          }
          console.error('[회원가입] 실패', error.code);
          return;
        }

        setIsModalOpen(true);
      }
    } catch (e) {
      notify('예상치 못한 오류가 발생했습니다.', 'error');
      console.error('[회원가입] 예상치 못한 오류', e);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/login');
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
          <div className="text-main h4 mb-[26px] text-center !font-bold">
            Create Your Account
          </div>

          <form action={handleSignUp} className="w-full">
            <div className="relative mb-[6px]">
              <User className="text-gray3 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
              {isValidName(name) && (
                <Check className="text-green-info absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
              )}
              <input
                className="t5 border-gray3 placeholder:t5 h-[32px] w-full rounded-[4px] border bg-white pl-10 md:h-[40px]"
                placeholder="이름을 입력하세요"
                onChange={handleNameInput}
                value={name}
              />
            </div>
            {!isValidName(name) ? (
              <div className="t5 mb-[10px] text-red-500 md:mb-[14px]">
                이름은 공백과 특수문자를 제외한 2자 이상 16자 이하로
                작성해주세요.
              </div>
            ) : (
              <div className="t5 mb-[10px] text-green-600 md:mb-[14px]">
                올바른 형식입니다.
              </div>
            )}

            <div className="relative mb-[6px]">
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
            {!isValidEmail(email) ? (
              <div className="t5 mb-[10px] text-red-500 md:mb-[14px]">
                이메일은 @와 도메인을 포함시켜 작성해주세요.
              </div>
            ) : (
              <div className="t5 mb-[10px] text-green-600 md:mb-[14px]">
                올바른 형식입니다.
              </div>
            )}

            <div className="relative mb-[6px]">
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
            {!isValidPassword(password) ? (
              <div className="t5 mb-[10px] text-red-500 md:mb-[14px]">
                비밀번호는 8자 이상 20자 이하로 영문 대소문자, 숫자, 특수문자가
                모두 들어가도록 작성해주세요.
              </div>
            ) : (
              <div className="t5 mb-[14px] text-green-600 md:mb-[26px]">
                올바른 형식입니다.
              </div>
            )}

            <button
              type="submit"
              disabled={
                !isValidName(name) ||
                !isValidEmail(email) ||
                !isValidPassword(password)
              }
              className="bg-main t3 mb-[30px] h-[32px] w-full rounded-[4px] text-white transition hover:shadow-lg active:bg-black disabled:cursor-not-allowed disabled:bg-gray-400 md:h-[40px]"
            >
              가입하기
            </button>
          </form>

          <EmailVerificationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />

          <div className="t5 mb-[12px] w-full text-left">
            이미 계정이 있으신가요?{' '}
            <button
              className="text-sub1 cursor-pointer font-bold"
              onClick={() => navigate('/login')}
            >
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
