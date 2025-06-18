import AlgorithmListCard from '../../../components/list/AlgorithmListCard';
import SearchBox from '../../../components/search/SearchBox';
// import TagSearch from '../../../components/search/SearchTag';
import PageName from '../../../components/ui/PageName';
import SearchListTop from '../../../components/search/SearchListTop';
import { useEffect, useRef, useState } from 'react';
import { useProblemStore } from '../../../stores/problemStore';
import { useLoaderData } from 'react-router';
import type { ChannelType } from '../../../types';
import Nopost from '../../../components/ui/Nopost';
import TopButton from '../../../components/common/TopButton';
import AlgorithmListCardSkeleton from '../../../components/list/AlgorithmListCardSkeleton';

export default function AlgorithmProblemList() {
  const page = useRef(0);
  const setProblemsByPage = useProblemStore((state) => state.setProblemsByPage);
  const allProblems = useProblemStore((state) => state.problems);
  const problems = allProblems.flatMap((p) => p.posts);
  const endListRef = useRef<HTMLDivElement | null>(null);
  const isFetched = useRef(false);
  const channel = useLoaderData<ChannelType>();

  const { searchQuery, setSearchQuery, sortType, setSortType, resetProblems } =
    useProblemStore();
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    setIsFirstLoading(true);
    setProblemsByPage(page.current, sortType).finally(() => {
      setIsFirstLoading(false);

      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          page.current += 1;
          setProblemsByPage(page.current, sortType).finally(() => {
            setIsLoading(false);
          });
        }
      });

      const current = endListRef.current;
      if (current) observer.observe(current);

      return () => {
        if (current) observer.unobserve(current);
      };
    });
  }, [searchQuery, sortType]);

  const handleSortChange = (newSort: 'latest' | 'popular') => {
    resetProblems();
    setSortType(newSort);
    page.current = 0;
    isFetched.current = true;

    setIsFirstLoading(true);
    setProblemsByPage(0, newSort).finally(() => {
      setIsFirstLoading(false);
    });
  };

  const handleSearch = async () => {
    resetProblems();
    setSearchQuery(query);
    page.current = 0;
    isFetched.current = true;

    setIsFirstLoading(true);
    setProblemsByPage(0, sortType).finally(() => {
      setIsFirstLoading(false);
    });
  };

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title={channel.name} />
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          <SearchBox
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />
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
                query={query}
                sortType={sortType}
                setSortType={handleSortChange}
                isAlgorithm={true}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {isFirstLoading &&
                Array.from({ length: 10 }).map((_, i) => (
                  <AlgorithmListCardSkeleton key={`first-skeleton-${i}`} />
                ))}

              {problems &&
                !isFirstLoading &&
                problems.map((problem, i) => (
                  <AlgorithmListCard
                    key={`${problem.id}-${i}`}
                    problem={problem}
                  />
                ))}

              {problems && problems.length === 0 && !isFirstLoading && (
                <div className="col-span-2 py-12 text-center">
                  <Nopost />
                </div>
              )}

              {isLoading &&
                Array.from({ length: 2 }).map((_, i) => (
                  <AlgorithmListCardSkeleton key={`skeleton-${i}`} />
                ))}
            </div>
            <div ref={endListRef}></div>
          </div>
        </div>
        <TopButton />
      </div>
    </>
  );
}
