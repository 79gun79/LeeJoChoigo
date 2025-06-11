import { ChevronLeft, House, LogOut } from 'lucide-react';
import userDefault from '../assets/images/icon-user-default.png';
import { useState, useEffect } from 'react';
import IsLoginModal from '../components/modals/IsLoginModal';
import { NavLink, useNavigate } from 'react-router';
import Navigation from '../components/atoms/Navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import supabase from '../utils/supabase';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// 각 요소가 위에서 아래로 나타나는 애니메이션 variants
const containerVariants: Variants = {
  open: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.01,
    },
  },
  closed: {},
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  },
  closed: {
    opacity: 0,
    y: -30,
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  },
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const setLogout = useAuthStore((state) => state.setLogout);
  const isLogin = useAuthStore((state) => state.isLogin);

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

  const isLoginModalHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    if (!isLogin) {
      onClose();
      e.preventDefault();
      setLoginOpen(true);
    }
  };
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setLogout();
      onClose();
      navigate('/');
    }
  };
  return (
    <>
      {/* 오버레이 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* 사이드바 */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-[40px] left-2 z-50 w-[220px] overflow-hidden rounded-xl bg-white shadow-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
          >
            <motion.div
              className="flex flex-col"
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div
                className="my-3 flex items-center gap-2"
                variants={itemVariants}
              >
                <button onClick={onClose}>
                  <ChevronLeft className="ml-2" />
                </button>
              </motion.div>

              <motion.div
                className="bg-main flex items-center gap-3 px-2 py-4 text-white"
                variants={itemVariants}
              >
                {isLogin ? (
                  <>
                    <img
                      src={userInfo.avatar_url || userDefault}
                      alt="사용자 이미지"
                      className="h-10 w-10 rounded-full bg-white object-cover"
                    />
                    <div>
                      <div className="t3 font-medium">
                        {userInfo.name || '사용자'}
                      </div>
                      <div className="t5">{userInfo.email || ''}</div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="t3 px-4"
                  >
                    로그인<span className="ml-2">LOGO</span>
                  </button>
                )}
              </motion.div>
              {isLogin && (
                <>
                  <motion.div className="t4 flex" variants={itemVariants}>
                    <NavLink
                      to="/profile/myPage"
                      className={({ isActive }) =>
                        `${isActive ? 'text-main' : ''} flex flex-1 items-center justify-center gap-1 py-2`
                      }
                    >
                      MyPage
                      <House className="h-4 w-4" />
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="flex flex-1 items-center justify-center gap-1 py-2"
                    >
                      로그아웃
                      <LogOut className="h-4 w-4" />
                    </button>
                  </motion.div>

                  <motion.hr className="text-gray3" variants={itemVariants} />
                </>
              )}
              <motion.div variants={itemVariants}>
                <Navigation
                  direction="vertical"
                  onProtectedRoute={(e) => {
                    isLoginModalHandler(e);
                  }}
                  className="py-12"
                />
              </motion.div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <IsLoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
