import { useState } from 'react';
import supabase from './utils/supabase';

export default function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          avatar_url: null,
        },
      },
    });
  };
  return (
    <>
      <button onClick={handleGoogleLogin}>Google 로그인</button>
      <br />
      <button onClick={handleGithubLogin}>Github 로그인</button>
      <br />
      <form>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
        />
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        />
        <input
          type="password"
          placeholder="비밀번호을 입력하세요"
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        />
        <button type="submit" onClick={handleSignUp}>
          가입하기
        </button>
      </form>
    </>
  );
}
