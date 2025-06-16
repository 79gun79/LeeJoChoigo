import { ReactTyped } from 'react-typed';
import logo from '../assets/images/dailyCote.png';
import { CircleHelp, NotebookPen, PencilRuler, SquarePen } from 'lucide-react';

import MainUserInfo from '../components/main/MainUserInfo';
import { Link } from 'react-router';
import PopularProblem from '../components/main/MainPopularProblem';
import MainPopularProblem from '../components/main/MainNewProblem';
import MainRecommand from '../components/main/MainRecommand';
import { useAuthStore } from '../stores/authStore';
import { getUser } from '../api/userApi';
import { useEffect, useState } from 'react';
import type { User } from '../types';

export default function HomePage() {
  const session = useAuthStore((state) => state.session);
  const isLogin = useAuthStore((state) => state.isLogin);
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const userInfoFetch = async () => {
      if (!session) return;
      setIsLoading(true);
      if (session) {
        try {
          const userData = await getUser(session?.user.id);
          setUser(userData);
          setIsLoading(false);
        } catch (error) {
          console.error('데이터를 불러오는데 실패 했습니다.', error);
        }
      }
    };
    userInfoFetch();
  }, [session]);
  return (
    <>
      <div className="bg-main">
        <div className="h4 md:h1 relative h-[200px] overflow-hidden px-4 py-[25px] text-white md:px-8 md:py-[35px] lg:h-[250px] lg:px-14 lg:py-[45px] lg:text-3xl xl:mx-auto xl:max-w-6xl xl:px-0">
          <ReactTyped
            className="text-center"
            strings={[
              '데일리코테에 오신 것을 환영합니다!<br>문제를 풀러오셨나요?',
            ]}
            typeSpeed={70} //타이핑 속도
            backSpeed={30} //타이핑 지우는 속도
            backDelay={1000}
            loop={true} //반복할건지
          />
          <img
            src={logo}
            className="absolute right-0 bottom-0 left-full h-[500px] w-[500px] max-w-none -translate-x-[150px] translate-y-[150px] mix-blend-soft-light md:h-[600px] md:w-[600px] md:-translate-x-[185px] md:translate-y-[220px]"
          />
        </div>
      </div>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          {/* 사용자 정보 */}
          <div className="md:flex md:h-[180px] md:gap-6 lg:h-[200px]">
            <MainUserInfo
              user={user}
              isLogin={isLogin}
              isUserLoading={isLoading}
            />
            {/* 바로가기 메뉴 */}
            <div className="md:order-1 md:h-full md:w-full">
              <div className="mb-3 flex gap-1.5">
                📌
                <div>
                  <p className="content-title">바로가기 메뉴</p>
                  <p className="content-title-sub">
                    다양한 문제와 풀이를 만나보세요
                  </p>
                </div>
              </div>
              <div className="flex gap-2 md:h-[calc(100%-56px)] lg:h-[calc(100%-64px)]">
                <Link to="/problems/coding" className="menu-button group">
                  <span className="icon-bg">
                    <NotebookPen className="text-main h-5 w-5 lg:h-6 lg:w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-none break-words transition-colors duration-300 group-hover:text-white md:text-sm lg:text-base">
                    알고리즘
                    <br />
                    문제 풀기
                  </span>
                  <span className="menu-button-effect"></span>
                </Link>
                <Link to="/problems/job" className="menu-button group">
                  <span className="icon-bg">
                    <SquarePen className="text-main h-5 w-5 lg:h-6 lg:w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-none break-words transition-colors duration-300 group-hover:text-white md:text-sm lg:text-base">
                    개발직군
                    <br />
                    문제 풀기
                  </span>
                  <span className="menu-button-effect"></span>
                </Link>
                <Link to="/questions/write" className="menu-button group">
                  <span className="icon-bg">
                    <CircleHelp className="text-main h-5 w-5 lg:h-6 lg:w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-loose break-words transition-colors duration-300 group-hover:text-white md:text-sm lg:text-base">
                    질문하기
                  </span>
                  <span className="menu-button-effect"></span>
                </Link>
                <Link to="/problems/write" className="menu-button group">
                  <span className="icon-bg">
                    <PencilRuler className="text-main h-5 w-5 lg:h-6 lg:w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-none break-words transition-colors duration-300 group-hover:text-white md:text-sm lg:text-base">
                    개발직군
                    <br />
                    문제 만들기
                  </span>
                  <span className="menu-button-effect"></span>
                </Link>
              </div>
            </div>
          </div>
          {/* 추천문제 */}
          <MainRecommand user={user} isUserLoading={isLoading} />
          <div className="md:flex md:gap-6">
            {/* 인기문제 */}
            <PopularProblem />

            {/* 최신문제 */}
            <MainPopularProblem />
          </div>
        </div>
      </div>
    </>
  );
}
