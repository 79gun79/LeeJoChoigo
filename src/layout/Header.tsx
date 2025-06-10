import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Bell, Menu } from 'lucide-react';
import IsLoginModal from '../components/modals/IsLoginModal';
import { useAuthStore } from '../stores/authStore';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router';
import Navigation from '../components/atoms/Navigation';
import userDefault from '../assets/images/icon-user-default.png';
import DropdownMenu from '../components/modals/DropdownMenu';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const handleDropdownClick = async (path: string) => {
    if (path === '/logout') {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setLogout();
        navigate('/');
      }
    } else {
      navigate(path);
    }
    setDropdownOpen(false);
  };

  // 사용자 정보 상태 추가
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    email?: string;
    avatar_url?: string | null;
  }>({});
  useEffect(() => {
    // 로그인 상태일 때 supabase에서 유저 정보 가져오기
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserInfo({
          name: user.user_metadata?.name || '사용자',
          email: user.email,
          avatar_url: user.user_metadata?.avatar_url || null,
        });
      } else {
        setUserInfo({});
      }
    };
    if (isLogin) fetchUser();
    else setUserInfo({});
  }, [isLogin]);

  return (
    <>
      <header className="flex h-[55px] w-full items-center justify-between overflow-visible border-b border-[#cccccc] px-4 md:h-[60px] md:justify-around md:px-0">
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
          <div className="relative flex items-center gap-4">
            <Bell />
            <img
              src={userInfo.avatar_url || userDefault}
              alt="userProfile"
              className="h-7 cursor-pointer rounded-full lg:h-8"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <DropdownMenu
                items={[
                  { name: '마이페이지', path: '/profile/myPage' },
                  { name: '로그아웃', path: '/logout' },
                ]}
                isOpen={dropdownOpen}
                onItemClick={handleDropdownClick}
                onClose={() => setDropdownOpen(false)}
                className="absolute top-full right-0"
              />
            )}
          </div>
        )}

        {!isLogin && (
          <div className="flex items-center gap-4">
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
