import { ArrowDownUp, ChevronDown, Settings } from 'lucide-react';
import ProfilePostCard from '../../components/list/ProfilePostCard';
import { useState } from 'react';
import ProfileCommentCard from '../../components/list/ProfileCommentCard';
import ProfileEdit from './ProfileEdit';

export default function Profile() {
  const isActive = true;
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const modalCloseHandle = () => {
    setIsSetting(false);
  };
  return (
    <>
      <div className="xl:mx-auto xl:max-w-6xl">
        <div className="relative mb-6">
          <div className="h-[253px] w-full overflow-hidden md:h-[300px] lg:h-[400px]">
            <img
              className="h-full w-full object-cover"
              src="https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDhfMjQz/MDAxNjE1MTg3MDkyNTMz.9HxxVEDmqYcHWsCxo_3Ip69Dx0nEuQHdTS2kc1qMIbIg.HyqjQKn8iWhpUI5befdguscJhXZ-s34e1qGp-Rr7254g.JPEG.aksen244/%F0%9D%98%B6%F0%9D%98%B8%F0%9D%98%B6%F0%9D%98%A9%F0%9D%98%B0%F0%9D%98%A3%F0%9D%98%AA_%F0%9F%92%8C.jpg?type=w800"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-white/20 px-4 py-4 backdrop-blur-md md:px-8 md:py-5 lg:px-14">
            <div className="mb-2.5 flex items-center gap-2.5">
              <div className="h-[40px] w-[40px] overflow-hidden rounded-full md:h-[48px] md:w-[48px] lg:h-[56px] lg:w-[56px]">
                <img
                  className="h-full w-full object-cover"
                  src="https://i.pinimg.com/236x/0e/9c/af/0e9caf05bb22d9ace603c60c15d6fa4b.jpg"
                />
              </div>
              <div>
                <p className="text-sm font-semibold md:text-base lg:text-lg">
                  사용자이름
                </p>
                <p className="text-xs md:text-sm lg:text-base">
                  user@gmail.com
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button className="min-w-[94px] rounded-sm bg-[var(--color-gray2)] text-center text-[10px] text-[var(--color-gray4)] md:text-xs lg:min-w-[120px] lg:text-sm">
                팔로우
              </button>
              <button
                onClick={() => setIsSetting(true)}
                className="rounded-sm bg-[var(--color-gray2)] p-1 text-[var(--color-gray4)]"
              >
                <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>
          </div>
        </div>
        <div>
          {/* 게시글, 댓글 탭 */}
          <ul className="flex">
            <li
              className={`w-full border-b border-[var(--color-gray1)] py-1.5 text-center text-sm font-medium text-[var(--color-gray3)] md:text-base lg:text-lg ${isActive && 'border-black text-black'}`}
            >
              작성게시글
            </li>
            <li className="w-full border-b border-[var(--color-gray1)] py-1.5 text-center text-sm font-medium text-[var(--color-gray3)] md:text-base lg:text-lg">
              작성댓글
            </li>
          </ul>

          <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
            {/* 전체글, 최신순 select */}
            <div className="mb-3 flex items-center">
              <div className="relative">
                <button
                  className="relative text-xs md:text-sm lg:text-base"
                  onClick={() => setIsSelectActive(!isSelectActive)}
                >
                  <p className="cursor-pointer py-1 pr-6.5 pl-1.5 md:pr-6.5">
                    전체글
                  </p>
                  <ChevronDown className="top0 absolute top-1/2 right-1 h-[17px] w-[17px] -translate-y-1/2 md:h-[19px] md:w-[19px]" />
                </button>
                <ul
                  className={`absolute top-full left-0 z-10 hidden flex-col gap-1.5 rounded-sm border border-[#ccc] bg-white px-3 py-2.5 text-xs text-nowrap md:text-sm lg:text-base ${isSelectActive && 'flex!'}`}
                >
                  <li>알고리즘풀이</li>
                  <li>내가 낸 문제</li>
                  <li>개발직군 출제 문제</li>
                  <li>질문 게시판</li>
                </ul>
              </div>

              <div className="relative ml-auto">
                <select className="cursor-pointer appearance-none py-1 pr-5.5 pl-1.5 text-xs md:pr-6.5 md:text-sm lg:text-base">
                  <option>최신순</option>
                  <option>인기순</option>
                </select>
                <ArrowDownUp className="top0 absolute top-1/2 right-1 h-[12px] w-[12px] -translate-y-1/2 md:h-[16px] md:w-[16px]" />
              </div>
            </div>
            {/* 목록 */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <ProfileCommentCard />
              <ProfileCommentCard />
              <ProfilePostCard image="sada" />
              <ProfilePostCard image="sada" />
              <ProfilePostCard />
            </div>
          </div>
        </div>
      </div>
      {isSetting && <ProfileEdit close={modalCloseHandle} />}
    </>
  );
}
