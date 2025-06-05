import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Menu } from 'lucide-react';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex h-[60px] w-full items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <button
            className="text-2xl md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </button>
          <span>LOGO</span>
        </div>

        <nav className="hidden gap-6 text-[18px] font-medium md:flex">
          <a href="#">문제게시판</a>
          <a href="#">풀이게시판</a>
          <a href="#">질문게시판</a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="rounded-[4px] border border-[#060606] px-3 py-1 text-sm">
            로그인
          </button>
          <button className="rounded-[4px] border border-[#184D59] bg-[#184D59] px-3 py-1 text-sm text-white">
            가입
          </button>
        </div>
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
