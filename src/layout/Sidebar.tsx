import { ChevronLeft, House, LogOut } from 'lucide-react';
import userDefault from '../assets/images/icon-user-default.png';
import { useState } from 'react';
import IsLoginModal from '../components/modals/IsLoginModal';
import { NavLink, useNavigate } from 'react-router';
import Navigation from '../components/atoms/Navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const isLoginModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    onClose();
    e.preventDefault();
    setLoginOpen(true);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-2/3 bg-white shadow transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 border-b p-4">
          <button onClick={onClose} className="text-xl">
            <ChevronLeft />
          </button>
          <span>LOGO</span>
        </div>

        <div className="flex items-center gap-3 bg-[#184D59] px-4 py-6 text-white">
          <img
            src={userDefault}
            alt="사용자 이미지"
            className="h-10 w-10 rounded-full bg-white"
          />
          <div>
            <div className="text-sm font-medium">사용자</div>
            <div className="text-xs">user@gmail.com</div>
          </div>
        </div>

        <div className="flex border border-[#CCCCCC] text-sm">
          <NavLink
            to="/profile/myPage"
            className="flex flex-1 items-center justify-center gap-1 border-r border-[#CCCCCC] py-2"
          >
            MyPage
            <House className="h-4 w-4" />
          </NavLink>
          <button className="flex flex-1 items-center justify-center gap-1 py-2">
            로그아웃
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <Navigation
          direction="vertical"
          onProtectedRoute={(e) => {
            e.preventDefault();
            setLoginOpen(true);
            onClose();
          }}
        />
      </aside>
      <IsLoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
