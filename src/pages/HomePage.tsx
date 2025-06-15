import { ReactTyped } from 'react-typed';
import logo from '../assets/images/dailyCote.png';
import {
  ChevronRight,
  CircleHelp,
  NotebookPen,
  PencilRuler,
  SquarePen,
  User,
} from 'lucide-react';
import { useState } from 'react';

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
            <div className="relative -mt-28 mb-6 box-border h-[150px] rounded-sm bg-white p-5 drop-shadow-md transition-[margin] duration-500 md:order-2 md:mt-0 md:h-full md:w-[320px] md:shrink-0 md:p-6 md:py-7 md:transition-none lg:w-[380px] lg:p-7 lg:py-8">
              {/* 비로그인 */}
              {/* <div className="flex h-full flex-col items-center justify-center gap-3.5">
                <p className="text-gray4 text-center text-sm leading-tight md:text-base lg:text-lg">
                  로그인 서비스로 <br />
                  나의 진행사항을 알아보세요!
                </p>
                <button className="bg-main rounded-2xl px-3 py-0.5 text-sm text-white md:px-3.5 md:text-base lg:px-5 lg:text-lg">
                  로그인
                </button>
              </div> */}
              {/* 로그인 */}
              <div className="flex h-full flex-col">
                <p className="flex flex-wrap items-end gap-1 text-sm md:text-base lg:text-lg">
                  <User className="h-5 w-5 shrink-0" />
                  <span className="relative line-clamp-1 text-base leading-none font-bold md:text-lg lg:text-xl">
                    {'홍길동'}
                    <span className="bg-sub1/30 absolute -bottom-[2px] -left-[2px] -z-1 h-5/7 w-[calc(100%+4px)]"></span>
                  </span>
                  <span className="mb-[1px] leading-none">
                    님이 진행하신 내용
                  </span>
                </p>
                <div className="mt-auto flex w-full justify-center gap-7">
                  <div className="flex flex-col items-center gap-2">
                    <p className="flex items-end gap-0.5 md:text-lg">
                      <span className="text-4xl leading-none font-bold lg:text-5xl">
                        3
                      </span>
                      /<span>100</span>
                    </p>
                    <p className="rounded-2xl border border-[#ccc] px-3 py-0.5 text-xs md:px-4 md:text-sm lg:px-5 lg:text-base">
                      알고리즘 문제
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="flex items-end gap-0.5 md:text-lg">
                      <span className="text-4xl leading-none font-bold lg:text-5xl">
                        1
                      </span>
                      /<span>30</span>
                    </p>
                    <p className="rounded-2xl border border-[#ccc] px-3 py-0.5 text-xs md:px-4 md:text-sm lg:px-5 lg:text-base">
                      개발직군 문제
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                <button className="menu-button group">
                  <span className="icon-bg">
                    <NotebookPen className="text-main h-5 w-5 lg:h-6 lg:w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-none break-words transition-colors duration-300 group-hover:text-white md:text-sm lg:text-base">
                    알고리즘
                    <br />
                    문제 풀기
                  </span>
                  <span className="menu-button-effect"></span>
                </button>
                <button className="menu-button group">
                  <span className="icon-bg">
                    <SquarePen className="text-main h-5 w-5 lg:h-6 lg:w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-none break-words transition-colors duration-300 group-hover:text-white md:text-sm lg:text-base">
                    개발직군
                    <br />
                    문제 풀기
                  </span>
                  <span className="menu-button-effect"></span>
                </button>
                <button className="menu-button group">
                  <span className="icon-bg">
                    <CircleHelp className="text-main h-5 w-5 lg:h-6 lg:w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-loose break-words transition-colors duration-300 group-hover:text-white md:text-sm lg:text-base">
                    질문하기
                  </span>
                  <span className="menu-button-effect"></span>
                </button>
                <button className="menu-button group">
                  <span className="icon-bg">
                    <PencilRuler className="text-main h-5 w-5 lg:h-6 lg:w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-none break-words transition-colors duration-300 group-hover:text-white md:text-sm lg:text-base">
                    개발직군
                    <br />
                    문제 만들기
                  </span>
                  <span className="menu-button-effect"></span>
                </button>
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
                  <button className="absolute -top-[30px] right-0 flex items-center text-[10px] md:top-[18px] md:right-6 md:text-sm lg:top-[20px]">
                    전체보기 <ChevronRight className="h-4 w-4" />
                  </button>
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
                  <button className="absolute -top-[30px] right-0 flex items-center text-[10px] md:top-[18px] md:right-6 md:text-sm lg:top-[20px]">
                    전체보기 <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex md:gap-6">
            {/* 인기문제 */}
            <div className="mb-6 md:w-full">
              <div className="mb-3 flex gap-1.5">
                👑
                <div>
                  <p className="content-title">인기 문제</p>
                  <p className="content-title-sub">
                    사용자들이 가장 많이 풀어 본 문제를 풀어보세요
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="hover-box flex items-center gap-5 rounded-sm border border-[#ccc] px-5 py-3 md:py-4">
                  <p className="text-sm font-semibold md:text-base lg:text-lg">
                    1
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sub1 line-clamp-1 text-xs font-semibold md:text-sm lg:text-base">
                      개발직군 문제
                    </p>
                    <p className="hover line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                      개발직군 문제 제목
                    </p>
                  </div>
                </div>
                <div className="hover-box flex items-center gap-5 rounded-sm border border-[#ccc] px-5 py-3 md:py-4">
                  <p className="text-sm font-semibold md:text-base lg:text-lg">
                    2
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-main line-clamp-1 text-xs font-semibold md:text-sm lg:text-base">
                      알고리즘 문제
                    </p>
                    <p className="hover line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                      알고리즘 문제 제목
                    </p>
                  </div>
                </div>
                <div className="hover-box flex items-center gap-5 rounded-sm border border-[#ccc] px-5 py-3 md:py-4">
                  <p className="text-sm font-semibold md:text-base lg:text-lg">
                    3
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sub1 line-clamp-1 text-xs font-semibold md:text-sm lg:text-base">
                      개발직군 문제
                    </p>
                    <p className="hover line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                      개발직군 문제 제목
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 최신문제 */}
            <div className="md:w-full">
              <div className="mb-3 flex gap-1.5">
                ✨
                <div>
                  <p className="content-title">최신 문제</p>
                  <p className="content-title-sub">
                    새로 만들어진 문제를 풀어보세요
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:p-4">
                  <p className="text-sub1 line-clamp-1 text-xs font-semibold md:text-sm lg:text-base">
                    개발직군 카테고리
                  </p>
                  <p className="hover line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                    개발직군 문제 제목
                  </p>
                  <p className="line-clamp-2 text-xs md:text-sm lg:text-base">
                    개발직군 문제 내용내용내용내용내용내용 개발직군 문제
                    내용내용내용내용내용내용개발직군 문제
                    내용내용내용내용내용내용개발직군 문제
                    내용내용내용내용내용내용
                  </p>
                </div>
                <div className="hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:p-4">
                  <p className="text-sub1 line-clamp-1 text-xs font-semibold md:text-sm lg:text-base">
                    개발직군 카테고리
                  </p>
                  <p className="hover line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                    개발직군 문제 제목
                  </p>
                  <p className="line-clamp-2 text-xs md:text-sm lg:text-base">
                    개발직군 문제 내용내용내용내용내용내용 개발직군 문제
                    내용내용내용내용내용내용개발직군 문제
                    내용내용내용내용내용내용개발직군 문제
                    내용내용내용내용내용내용
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
