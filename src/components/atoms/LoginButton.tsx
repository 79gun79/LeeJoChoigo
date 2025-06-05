export default function LoginButton() {
  return (
    <div className="flex justify-center">
      <div className="space-y-[20px]">
        <div className="t3 relative flex h-[40px] w-[220px] cursor-pointer items-center rounded-[4px] bg-white text-[#7c838a] drop-shadow-sm">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2"
          />
          <span className="flex-1 text-center">Log in with Google</span>
        </div>
        <div className="t3 relative flex h-[40px] w-[220px] cursor-pointer items-center rounded-[4px] bg-white text-[#7c838a] drop-shadow-sm">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="Github"
            className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2"
          />
          <span className="flex-1 text-center">Log in with Github</span>
        </div>
      </div>
    </div>
  );
}
