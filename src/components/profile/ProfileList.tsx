import { ArrowDownUp, ChevronDown } from 'lucide-react';
import ProfileCommentCard from '../list/ProfileCommentCard';
import ProfilePostCard from '../list/ProfilePostCard';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  fetchUserChannelComments,
  fetchUserChannelLikes,
  fetchUserChannelPosts,
  fetchUserComments,
  fetchUserLikes,
  fetchUserPosts,
} from '../../loader/profile.loader';
import { useLocation } from 'react-router';
import NoList from '../ui/NoList';
import ProfileLikeCard from '../list/ProfileLikeCard';

export type ProfilePosts = NonNullable<
  Awaited<ReturnType<typeof fetchUserPosts>>
>;
export type ProfileComments = NonNullable<
  Awaited<ReturnType<typeof fetchUserComments>>
>;
export type ProfileLikes = NonNullable<
  Awaited<ReturnType<typeof fetchUserLikes>>
>;
type filterMenuType = { title: string; id: number }[];
export default function ProfileList({
  userId,
  currentTab,
}: {
  userId: string;
  currentTab: number;
}) {
  const location = useLocation();
  const receivedvMenu = location.state?.menu || 0;

  const [isLoading, setIsLoading] = useState(true);
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [selectFilterMenu, setSelectFilterMenu] = useState(receivedvMenu);
  const [displayPosts, setDiaplayPosts] = useState<
    ProfilePosts | ProfileComments | ProfileLikes
  >();
  const filterModalRef = useRef<HTMLUListElement>(null);

  const filterMenuDefault = useMemo(
    () => [
      { title: '전체', id: 0 },
      { title: '개발직군 문제', id: 2 },
      { title: '알고리즘 풀이', id: 3 },
      { title: '개발직군 풀이', id: 4 },
      { title: '질문게시판', id: 5 },
    ],
    [],
  );
  const [filterMenu, setFilterMenu] =
    useState<filterMenuType>(filterMenuDefault);

  useEffect(() => {
    if (currentTab === 2) {
      setFilterMenu(
        [...filterMenuDefault, { title: '알고리즘 문제', id: 1 }].sort(
          (a, b) => a.id - b.id,
        ),
      );
    } else {
      setFilterMenu(filterMenuDefault);
    }
  }, [currentTab, filterMenuDefault]);

  useEffect(() => {
    setIsLoading(true);
    if (currentTab !== 2 && selectFilterMenu === 1) {
      setSelectFilterMenu(0);
    }
    const fetchDatas = async () => {
      try {
        let resultDatas: ProfilePosts | ProfileComments | ProfileLikes;
        if (selectFilterMenu === 0) {
          if (currentTab === 0) {
            resultDatas = (await fetchUserPosts(userId)) || [];
          } else if (currentTab === 1) {
            resultDatas = (await fetchUserComments(userId)) || [];
          } else {
            resultDatas = (await fetchUserLikes(userId)) || [];
          }
        } else {
          if (currentTab === 0) {
            resultDatas =
              (await fetchUserChannelPosts(userId, selectFilterMenu)) || [];
          } else if (currentTab === 1) {
            resultDatas =
              (await fetchUserChannelComments(userId, selectFilterMenu)) || [];
          } else {
            resultDatas =
              (await fetchUserChannelLikes(userId, selectFilterMenu)) || [];
          }
        }
        setDiaplayPosts(resultDatas);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
    };

    fetchDatas();
  }, [selectFilterMenu, currentTab, userId]);

  // 정렬
  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    sortPost(e.target.value);
  };
  // 정렬
  const sortPost = (type: string) => {
    if (currentTab === 0) {
      const copyPosts = [...displayPosts!] as ProfilePosts;
      if (type === '최신순') {
        const time = copyPosts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ) as ProfilePosts;
        setDiaplayPosts(time);
      } else if (type === '인기순') {
        const popular = copyPosts.sort(
          (a, b) => b.like.length - a.like.length,
        ) as ProfilePosts;
        setDiaplayPosts(popular);
      }
    } else if (currentTab === 1) {
      const copyPosts = [...displayPosts!] as ProfileComments;
      if (type === '최신순') {
        const time = copyPosts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ) as ProfileComments;
        setDiaplayPosts(time);
      }
    } else {
      const copyPosts = [...displayPosts!] as ProfileLikes;
      if (type === '최신순') {
        const time = copyPosts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ) as ProfileLikes;
        setDiaplayPosts(time);
      } else if (type === '인기순') {
        const popular = copyPosts.sort(
          (a, b) => b.post.like_count - a.post.like_count,
        ) as ProfileLikes;
        setDiaplayPosts(popular);
      }
    }
  };

  // 모달 외부 클릭시 닫힘
  useEffect(() => {
    const clickFilterOutside = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;
      if (
        filterModalRef.current &&
        !filterModalRef.current.contains(e.target)
      ) {
        setIsSelectActive(false);
      }
    };

    document.addEventListener('mousedown', clickFilterOutside);

    return () => {
      document.removeEventListener('mousedown', clickFilterOutside);
    };
  }, [isSelectActive]);
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        {/* 전체글, 최신순 select */}
        <div className="mb-3 flex items-center">
          <div className="relative">
            <button
              className="relative text-xs md:text-sm lg:text-base"
              onClick={() => setIsSelectActive(!isSelectActive)}
            >
              <p className="cursor-pointer py-1 pr-6.5 pl-1.5 md:pr-6.5">
                {filterMenu.find((f) => f.id === selectFilterMenu)?.title}
              </p>
              <ChevronDown className="top0 absolute top-1/2 right-1 h-[17px] w-[17px] -translate-y-1/2 md:h-[19px] md:w-[19px]" />
            </button>
            <ul
              ref={filterModalRef}
              className={`absolute top-full left-0 z-10 hidden min-w-[130px] flex-col gap-1.5 rounded-sm border border-[#ccc] bg-white py-2.5 text-xs text-nowrap md:text-sm ${isSelectActive && 'flex!'}`}
            >
              {filterMenu.map((menu, index) => (
                <li key={menu.title + index}>
                  <button
                    onClick={() => {
                      setSelectFilterMenu(menu.id);
                      setIsSelectActive(false);
                    }}
                    className={`hover:bg-sub1/10 h-full w-full px-3 text-left lg:min-w-[150px] lg:px-4 lg:py-0.5 ${selectFilterMenu === menu.id && 'text-sub1 font-semibold'}`}
                  >
                    {menu.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative ml-auto">
            <select
              className="cursor-pointer appearance-none py-1 pr-5.5 pl-1.5 text-xs md:pr-6.5 md:text-sm lg:text-base"
              onChange={sortHandler}
            >
              <option>최신순</option>
              {currentTab !== 1 && <option>인기순</option>}
            </select>
            <ArrowDownUp className="top0 absolute top-1/2 right-1 h-[12px] w-[12px] -translate-y-1/2 md:h-[16px] md:w-[16px]" />
          </div>
        </div>
        {/* 목록 */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {!isLoading ? (
            displayPosts?.length !== 0 ? (
              displayPosts?.map((data, index) => {
                if (currentTab === 0) {
                  return (
                    <ProfilePostCard
                      key={index}
                      data={data as ProfilePosts[number]}
                    />
                  );
                } else if (currentTab === 1) {
                  return (
                    <ProfileCommentCard
                      key={index}
                      data={data as ProfileComments[number]}
                    />
                  );
                } else {
                  if ('post' in data && data.post) {
                    return (
                      <ProfileLikeCard
                        key={index}
                        data={data as ProfileLikes[number]}
                        profileUserId={userId}
                      />
                    );
                  } else {
                    return;
                  }
                }
              })
            ) : (
              <NoList />
            )
          ) : (
            Array.from({ length: displayPosts?.length || 5 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="w-full rounded-sm border border-[#ccc]"
                >
                  <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
                    <div className="mb-2.5 h-3.5 w-2/3 bg-gray-200 md:h-4.5 lg:h-5.5"></div>
                    <div className="mb-1 h-3 w-full bg-gray-200 md:h-4 lg:h-5"></div>
                    <div className="mb-2.5 h-3 w-4/5 bg-gray-200 md:h-4 lg:h-5"></div>
                    <div className="h-2.5 w-1/3 bg-gray-200 md:h-3.5 lg:h-4.5"></div>
                  </div>
                </div>
              ),
            )
          )}
        </div>
      </div>
    </>
  );
}
