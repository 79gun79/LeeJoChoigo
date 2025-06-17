import AlgorithmListCard from '../../../components/list/AlgorithmListCard';
// import SearchBox from '../../../components/search/SearchBox';
// import TagSearch from '../../../components/search/SearchTag';
import PageName from '../../../components/ui/PageName';
import SearchListTop from '../../../components/search/SearchListTop';
import { useEffect, useRef, useState } from 'react';
import { useProblemStore } from '../../../stores/problemStore';
import { useLoaderData } from 'react-router';
import type { BJPostType, ChannelType } from '../../../types';
import { getPopularPosts, getPopularProblem } from '../../../api/mainApi';
import Loading from '../../../components/ui/Loading';
import Nopost from '../../../components/ui/Nopost';

export default function AlgorithmProblemList() {
  const page = useRef(0);
  const setProblemsByPage = useProblemStore((state) => state.setProblemsByPage);
  const allProblems = useProblemStore((state) => state.problems);
  const problems = allProblems.flatMap((p) => p.posts);
  const endListRef = useRef<HTMLDivElement | null>(null);
  const isFetched = useRef(false);
  const channel = useLoaderData<ChannelType>();

  type PopularPostsType = Awaited<ReturnType<typeof getPopularPosts>>;
  const [popularProblems, setPopularProblems] = useState<BJPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { sortType, setSortType } = useProblemStore();

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    setProblemsByPage(page.current).then(() => {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          page.current += 1;
          setProblemsByPage(page.current);
        }
      });

      const current = endListRef.current;
      if (current) observer.observe(current);

      return () => {
        if (current) observer.unobserve(current);
      };
    });
    const popularProblems = async () => {
      try {
        setIsLoading(true);
        const postDatas = await getPopularPosts(); // 풀이 목록
        const populars = getCount(postDatas); // 푼 문제 동일값 카운트

        const popularsArray = Object.values(populars)
          ?.filter((v) => v.channel === 3)
          .sort((a, b) => b.count - a.count);

        const popularsData = await Promise.all(
          popularsArray?.map(async (item) => {
            const post = await popularPostFetch(item.problem);
            return post;
          }) || [],
        );

        setPopularProblems(popularsData as BJPostType[]);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    popularProblems();
  }, [setProblemsByPage]);

  // 카운트가 가장 많은 문제 데이터 가져오기
  const popularPostFetch = async (id: number) => {
    try {
      const post = await getPopularProblem(id);
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
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title={channel.name} />
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          {/* <SearchBox
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          /> */}
          {/* <TagSearch /> */}
        </div>
        <div>
          <div className="mb-2">
            <p className="mb-1.5 text-sm md:text-base">선택한 유형</p>
            <div className="flex flex-wrap gap-2.5">
              {/* <TagItem></TagItem>
              <TagItem></TagItem> */}
            </div>
          </div>
          <div>
            <div className="mb-1">
              <SearchListTop
                query=""
                sortType={sortType}
                setSortType={setSortType}
                isAlgorithm={true}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {isLoading ? (
                <div className="col-span-2 text-center">
                  <Loading />
                </div>
              ) : problems.length <= 0 ? (
                <Nopost />
              ) : (
                (sortType === 'latest' ? problems : popularProblems).map(
                  (problem) => (
                    <AlgorithmListCard key={problem.id} problem={problem} />
                  ),
                )
              )}
            </div>
            <div ref={endListRef}></div>
          </div>
        </div>
      </div>
    </>
  );
}
