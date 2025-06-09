import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import IsLoginModal from '../components/modals/IsLoginModal';
import { useAuthStore } from '../stores/authStore';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router';
import Navigation from '../components/atoms/Navigation';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const setLogout = useAuthStore((state) => state.setLogout);
  const navigate = useNavigate();

  const isLoginModalHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!isLogin) {
      e.preventDefault();
      setLoginOpen(true);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setLogout();
      navigate('/');
    }
  };

  return (
    <>
      <header className="flex h-[55px] w-full items-center justify-between border-b border-[#cccccc] px-4 md:h-[60px] md:justify-around md:px-0">
        <div className="flex items-center gap-2">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-[22px]" />
          </button>
          <button
            className="text-main cursor-pointer"
            onClick={() => navigate('/')}
          >
            LOGO
          </button>
        </div>

        <Navigation onProtectedRoute={isLoginModalHandler} />

        {isLogin && (
          <div className="flex items-center">
            <button
              className="t5 rounded-[4px] border border-[#060606] px-3 py-1"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}

        {!isLogin && (
          <div className="flex items-center gap-2">
            <button
              className="t5 rounded-[4px] border border-[#060606] px-3 py-1"
              onClick={() =>
                navigate('/login', { state: { from: location.pathname } })
              }
            >
              로그인
            </button>
            <button
              className="bg-main t5 border-main rounded-[4px] border px-3 py-1 text-white"
              onClick={() => navigate('/signup')}
            >
              가입
            </button>
          </div>
        )}
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <IsLoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
