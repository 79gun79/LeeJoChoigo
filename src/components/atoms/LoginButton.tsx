import supabase from '../../utils/supabase';

export default function LoginButton() {
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

  return (
    <div className="flex w-[20px] justify-center">
      <div className="space-y-[20px] md:flex md:space-y-0 md:space-x-[10px]">
        <button
          className="t3 relative flex h-[40px] w-[200px] cursor-pointer items-center rounded-[4px] bg-white text-[#7c838a] drop-shadow-sm md:text-[14px]"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="ml-3 h-5 w-5"
          />
          <span className="ml-2 flex-1">Log in with Google</span>
        </button>
        <button
          className="t3 relative flex h-[40px] w-[200px] cursor-pointer items-center rounded-[4px] bg-white text-[#7c838a] drop-shadow-sm md:text-[14px]"
          onClick={handleGithubLogin}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="Github"
            className="ml-3 h-5 w-5"
          />
          <span className="ml-2 flex-1">Log in with Github</span>
        </button>
      </div>
    </div>
  );
}
