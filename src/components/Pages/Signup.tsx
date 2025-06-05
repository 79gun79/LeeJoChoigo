import LoginButton from '../atoms/LoginButton';

export default function Signup() {
  return (
    <div className="bg-bg-white flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xs">
        <h1 className="text-main h4 mb-6 text-center !font-bold">
          Create Your Account
        </h1>
        <input
          className="t5 border-gray3 mb-[16px] w-full rounded-[4px] border bg-white px-4 py-2"
          placeholder="이름을 입력하세요"
        />
        <input
          type="email"
          className="t5 border-gray3 mb-[16px] w-full rounded-[4px] border bg-white px-4 py-2"
          placeholder="이메일 주소를 입력하세요"
        />
        <input
          type="password"
          className="t5 border-gray3 mb-[20px] w-full rounded-[4px] border bg-white px-4 py-2"
          placeholder="비밀번호를 입력하세요"
        />
        <button className="bg-main mb-[30px] w-full rounded-[4px] py-2 text-sm font-semibold text-white">
          가입하기
        </button>
        <div className="t5 mb-[16px] text-sm">
          이미 계정이 있으신가요?{' '}
          <span className="text-sub1 font-bold">로그인</span>
        </div>
        <div className="mb-[40px] flex items-center justify-center">
          <span className="t1 text-gray3 mx-2 text-sm !font-bold">- OR -</span>
        </div>
        <LoginButton />
      </div>
    </div>
  );
}
