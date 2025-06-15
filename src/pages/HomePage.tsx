import { ReactTyped } from 'react-typed';
import logo from '../assets/images/dailyCote.png';
import {
  ChevronRight,
  CircleHelp,
  NotebookPen,
  PencilRuler,
  SquarePen,
} from 'lucide-react';
import { useState } from 'react';

import MainUserInfo from '../components/main/MainUserInfo';
import { Link } from 'react-router';
import PopularProblem from '../components/main/PopularProblem';
import MainNewProblem from '../components/main/MainNewProblem';

export default function HomePage() {
  const [isActive, setIsActive] = useState(0);

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
            backDelay={5000}
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
            <MainUserInfo />
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
          <div>
            <div className="mb-3 flex gap-1.5">
              ✍️
              <div>
                <p className="content-title"> 추천 문제</p>
                <p className="content-title-sub">랜덤 추천 문제를 풀어보세요</p>
              </div>
            </div>
            <div className="relative flex gap-2.5 pb-[300px] md:gap-6 md:pb-0">
              <div
                className={`group w-full ${isActive === 0 && 'active'} rounded-sm border-[#ccc] md:relative md:border`}
              >
                <button
                  onClick={() => setIsActive(0)}
                  className="bg-gray1 group-[.active]:bg-main w-full rounded-sm py-1.5 text-center text-sm group-[.active]:text-white md:rounded-none md:border-b md:border-[#ccc] md:bg-transparent md:px-7 md:py-4 md:text-left md:text-base md:group-[.active]:bg-transparent md:group-[.active]:text-black lg:text-lg"
                >
                  알고리즘 문제
                </button>
                <div className="hidden group-[.active]:block md:block md:px-3">
                  <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2.5 md:static md:gap-0">
                    <div className="hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:border-b md:py-4">
                      <p className="text-main line-clamp-1 text-xs font-semibold md:text-sm">
                        알고리즘 Level
                      </p>
                      <p className="hover line-clamp-1 text-sm font-bold md:text-base">
                        알고리즘 문제 제목
                      </p>
                      <p className="line-clamp-1 text-xs md:text-sm">
                        알고리즘 문제 내용내용내용내용내용내용
                      </p>
                    </div>
                    <div className="hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:border-b md:py-4">
                      <p className="text-main line-clamp-1 text-xs font-semibold md:text-sm">
                        알고리즘 Level
                      </p>
                      <p className="hover line-clamp-1 text-sm font-bold md:text-base">
                        알고리즘 문제 제목
                      </p>
                      <p className="line-clamp-1 text-xs md:text-sm">
                        알고리즘 문제 내용내용내용내용내용내용
                      </p>
                    </div>
                    <div className="hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:py-4">
                      <p className="text-main line-clamp-1 text-xs font-semibold md:text-sm">
                        알고리즘 Level
                      </p>
                      <p className="hover line-clamp-1 text-sm font-bold md:text-base">
                        알고리즘 문제 제목
                      </p>
                      <p className="line-clamp-1 text-xs md:text-sm">
                        알고리즘 문제 내용내용내용내용내용내용
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/problems/coding"
                    className="absolute -top-[30px] right-0 flex items-center text-[10px] md:top-[18px] md:right-6 md:text-sm lg:top-[20px]"
                  >
                    전체보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div
                className={`group w-full ${isActive === 1 && 'active'} rounded-sm border-[#ccc] md:border`}
              >
                <button
                  onClick={() => setIsActive(1)}
                  className="bg-gray1 group-[.active]:bg-sub1 w-full rounded-sm py-1.5 text-center text-sm group-[.active]:text-white md:rounded-none md:border-b md:border-[#ccc] md:bg-transparent md:px-7 md:py-4 md:text-left md:text-base md:group-[.active]:bg-transparent md:group-[.active]:text-black lg:text-lg"
                >
                  개발직군 문제
                </button>
                <div className="hidden group-[.active]:block md:block md:px-4">
                  <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2.5 md:static md:gap-0">
                    <div className="hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:border-b md:py-4">
                      <p className="text-sub1 line-clamp-1 text-xs font-semibold md:text-sm">
                        개발직군 카테고리
                      </p>
                      <p className="hover line-clamp-1 text-sm font-bold md:text-base">
                        개발직군 문제 제목
                      </p>
                      <p className="line-clamp-1 text-xs md:text-sm">
                        개발직군 문제 내용내용내용내용내용내용
                      </p>
                    </div>
                    <div className="hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:border-b md:py-4">
                      <p className="text-sub1 line-clamp-1 text-xs font-semibold md:text-sm">
                        개발직군 카테고리
                      </p>
                      <p className="hover line-clamp-1 text-sm font-bold md:text-base">
                        개발직군 문제 제목
                      </p>
                      <p className="line-clamp-1 text-xs md:text-sm">
                        개발직군 문제 내용내용내용내용내용내용
                      </p>
                    </div>
                    <div className="hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:py-4">
                      <p className="text-sub1 line-clamp-1 text-xs font-semibold md:text-sm">
                        개발직군 카테고리
                      </p>
                      <p className="hover line-clamp-1 text-sm font-bold md:text-base">
                        개발직군 문제 제목
                      </p>
                      <p className="line-clamp-1 text-xs md:text-sm">
                        개발직군 문제 내용내용내용내용내용내용
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/problems/job"
                    className="absolute -top-[30px] right-0 flex items-center text-[10px] md:top-[18px] md:right-6 md:text-sm lg:top-[20px]"
                  >
                    전체보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex md:gap-6">
            {/* 인기문제 */}
            <PopularProblem />

            {/* 최신문제 */}
            <MainNewProblem />
          </div>
        </div>
      </div>
    </>
  );
}
