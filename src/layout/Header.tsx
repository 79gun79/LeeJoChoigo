import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router';
import Navigation from '../components/atoms/Navigation';
import userDefault from '../assets/images/icon-user-default.png';
import DropdownMenu from '../components/modals/DropdownMenu';
import { useModalStore } from '../stores/modalStore';
import logo from '/dailyCote.png';
import AlarmLayout from './AlarmLayout';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setLogInModal } = useModalStore();
  const session = useAuthStore((state) => state.session);
  const isLogin = useAuthStore((state) => state.isLogin);
  const setLogout = useAuthStore((state) => state.setLogout);
  const navigate = useNavigate();

  const isLoginModalHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!isLogin) {
      e.preventDefault();
      setLogInModal(true);
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
      <header className="shadow-sm">
        <div className="flex h-[55px] w-full items-center justify-between overflow-visible px-4 md:h-[75px] md:px-8 lg:px-14 xl:mx-auto xl:max-w-6xl xl:px-0">
          <div className="flex h-full gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-[22px]" />
            </button>
            <button
              className="text-main flex h-full cursor-pointer items-center justify-center overflow-hidden"
              onClick={() => navigate('/')}
            >
              <img
                className="ml-[-8px] w-30 object-cover md:w-34 lg:w-38"
                src={logo}
              />
            </button>
          </div>

          <Navigation onProtectedRoute={isLoginModalHandler} />

          {isLogin && (
            <div className="relative flex items-start gap-4 pt-2">
              {/* 알림 버튼과 알림 모달을 AlarmLayout에서 모두 관리 */}
              <AlarmLayout />

              <img
                src={userInfo.avatar_url || userDefault}
                alt="프로필"
                className="h-7 cursor-pointer rounded-full lg:h-8"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <DropdownMenu
                  items={[
                    {
                      name: '마이페이지',
                      path: `/profile/${session?.user.id}`,
                    },
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
        </div>
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
