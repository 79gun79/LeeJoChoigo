import { useEffect, useState } from 'react';
import { getPopularPost, getPopularPosts } from '../../api/mainApi';
import { useNavigate } from 'react-router';
import { useModalStore } from '../../stores/modalStore';

type PopularPostsType = Awaited<ReturnType<typeof getPopularPosts>>;
type PopularPostType = Awaited<ReturnType<typeof getPopularPost>>;

export default function MainPopularProblem({ isLogin }: { isLogin: boolean }) {
  const [popularProblems, setPopularProblems] = useState<PopularPostType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setLogInModal } = useModalStore();

  useEffect(() => {
    const popularPosts = async () => {
      setIsLoading(true);
      try {
        const postDatas = await getPopularPosts(); // 풀이 목록
        const populars = getCount(postDatas); // 푼 문제 동일값 카운트

        const popularsArray = Object.values(populars)
          ?.sort((a, b) => b.count - a.count)
          .slice(0, 3);

        const popularsData = await Promise.all(
          popularsArray?.map(async (item) => {
            const post = await popularPostFetch(item.problem, item.channel);

            return post;
          }) || [],
        );

        setPopularProblems(popularsData);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
    };
    popularPosts();
  }, []);

  // 카운트가 가장 많은 문제 데이터 가져오기
  const popularPostFetch = async (id: number, channelId: number) => {
    try {
      const post = await getPopularPost(id, channelId);
      return post;
    } catch (error) {
      console.error('데이터를 불러오지 못했습니다.', error);
    }
  };

  // 가장 많은 풀이 카운트
  const getCount = (posts: PopularPostsType) => {
    if (!posts) return {};
    return posts.reduce(
      (pv, cv) => {
        const { problem_id, channel } = cv!;
        if (problem_id !== null) {
          if (!pv[problem_id]) {
            pv[problem_id] = {
              problem: problem_id,
              channel: channel,
              count: 1,
            };
          } else {
            pv[problem_id].count += 1;
          }
        }

        return pv;
      },
      {} as Record<number, { problem: number; channel: number; count: number }>,
    );
  };
  const linkClickHandler = (path: string) => {
    if (!isLogin) {
      setLogInModal(true);
      return;
    } else {
      navigate(path);
    }
  };
  return (
    <>
      <div className="mb-6 md:w-full">
        <div className="mb-3 flex gap-1.5">
          🔥
          <div>
            <p className="content-title">인기 문제</p>
            <p className="content-title-sub">
              사용자들이 가장 많이 풀어 본 문제를 풀어보세요
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm border border-[#ccc] p-3 md:p-4"
                >
                  <div className="flex w-full items-center gap-3 lg:gap-4">
                    <div className="h-7 w-5 animate-pulse rounded-sm bg-gray-200 md:h-7 md:w-6 lg:h-9 lg:w-7"></div>
                    <div className="w-full">
                      <div className="mb-3 h-3 w-1/5 animate-pulse rounded-sm bg-gray-200 md:h-4 lg:h-5"></div>
                      <div className="h-4 w-3/5 animate-pulse rounded-sm bg-gray-200 md:h-5 lg:h-6"></div>
                    </div>
                  </div>
                </div>
              ))
            : popularProblems &&
              popularProblems.map((problem, i) => {
                const linkTo =
                  problem?.channel === 2
                    ? `/problems/job/${problem?.id}`
                    : `/solutions/coding/write/${problem?.id}`;
                return (
                  <button
                    onClick={() => linkClickHandler(linkTo)}
                    key={problem?.id}
                    id={problem?.id.toString()}
                    className="hover-box dark:bg-bg-white flex items-center gap-5 rounded-sm border border-[#ccc] px-5 py-3 text-left md:py-4"
                  >
                    <p className="text-sm font-semibold md:text-base lg:text-lg">
                      {i + 1}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <p
                        className={`line-clamp-1 text-xs font-semibold md:text-sm lg:text-base ${problem?.channel === 1 && 'text-main'} ${problem?.channel === 2 && 'text-sub1'}`}
                      >
                        {problem?.channel === 1 && '알고리즘 문제'}
                        {problem?.channel === 2 && '개발직군 문제'}
                      </p>
                      <p className="hover line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                        {problem?.title}
                      </p>
                    </div>
                  </button>
                );
              })}
        </div>
      </div>
    </>
  );
}
