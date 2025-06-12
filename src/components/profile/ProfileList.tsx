import { ArrowDownUp, ChevronDown } from 'lucide-react';
import ProfileCommentCard from '../list/ProfileCommentCard';
import ProfilePostCard from '../list/ProfilePostCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import NoList from '../ui/NoList';
import type {
  ProfileComments,
  ProfilePosts,
} from '../../pages/profile/Profile';
import {
  fetchProfileComments,
  fetchProfilePost,
} from '../../loader/profile.loader';

export default function ProfileList({
  userId,
  currentTab,
}: {
  userId: string;
  currentTab: number;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<ProfilePosts | null>();
  const [comments, setComments] = useState<ProfileComments | null>();
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [selectFilterMenu, setSelectFilterMenu] = useState(0);
  const [filterPosts, setFilterPosts] = useState<ProfilePosts | null>();
  const [filterComments, setFilterComments] =
    useState<ProfileComments | null>();
  const filterModalRef = useRef<HTMLUListElement>(null);

  const filterMenu = [
    { title: '전체', id: 0 },
    { title: '개발직군 문제', id: 2 },
    { title: '알고리즘 풀이', id: 3 },
    { title: '개발직군 풀이', id: 4 },
    { title: '질문게시판', id: 5 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (currentTab === 0) {
          const posts = await fetchProfilePost(userId);
          setPosts(posts);
          // 탭변경시 전체글로 초기화
          setSelectFilterMenu(0);
        } else {
          const comments = await fetchProfileComments(userId);
          setComments(comments);
          // 탭변경시 전체글로 초기화
          setSelectFilterMenu(0);
        }
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId, currentTab]);

  // 정렬
  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentTab === 0) {
      sortPost(e.target.value);
    } else {
      sortComment(e.target.value);
    }
  };
  const sortPost = (type: string) => {
    if (type === '최신순') {
      const time = [...filterPosts!].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setFilterPosts(time);
    } else if (type === '인기순') {
      const popular = [...filterPosts!].sort(
        (a, b) => b.like.length - a.like.length,
      );
      setFilterPosts(popular);
    }
  };
  const sortComment = (type: string) => {
    if (type === '최신순') {
      const time = [...filterComments!].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setFilterComments(time);
    }
  };
  // 범위선택
  const filterPostHandler = useCallback(() => {
    if (posts) {
      if (selectFilterMenu === 0) {
        setFilterPosts(posts);
      } else {
        const results = posts.filter((f) => {
          if (selectFilterMenu === f.channel) {
            return f;
          }
        });
        setFilterPosts(results);
      }
    }
  }, [posts, selectFilterMenu, setFilterPosts]);
  const filterCommentHandler = useCallback(() => {
    if (comments) {
      if (selectFilterMenu === 0) {
        setFilterComments(comments);
      } else {
        const results = comments.filter((f) => {
          if (selectFilterMenu === f.post.channel) {
            return f;
          }
        });
        setFilterComments(results);
      }
    }
  }, [comments, selectFilterMenu, setFilterComments]);

  useEffect(() => {
    filterPostHandler();
  }, [filterPostHandler]);
  useEffect(() => {
    filterCommentHandler();
  }, [filterCommentHandler]);

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
              {currentTab === 0 && <option>인기순</option>}
            </select>
            <ArrowDownUp className="top0 absolute top-1/2 right-1 h-[12px] w-[12px] -translate-y-1/2 md:h-[16px] md:w-[16px]" />
          </div>
        </div>
        {/* 목록 */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {currentTab === 0 ? (
            isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
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
              ))
            ) : filterPosts?.length !== 0 ? (
              filterPosts?.map((data, index) => (
                <ProfilePostCard key={index} data={data} />
              ))
            ) : (
              <NoList />
            )
          ) : isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
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
            ))
          ) : filterComments?.length !== 0 ? (
            filterComments?.map((data, index) => (
              <ProfileCommentCard key={index} data={data} />
            ))
          ) : (
            <NoList />
          )}
        </div>
      </div>
    </>
  );
}
