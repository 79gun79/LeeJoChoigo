import AlgorithmListCard from '../../../components/list/AlgorithmListCard';
import SearchBox from '../../../components/search/SearchBox';
import TagSearch from '../../../components/search/SearchTag';
import PageName from '../../../components/ui/PageName';
import SearchListTop from '../../../components/search/SearchListTop';
import TagItem from '../../../components/ui/TagItem';
import type { Problem } from '../../../types/solvedProblem';
import { startTransition, useEffect, useRef, useState } from 'react';
import { fetchBjProblems } from '../../../utils/fetchBjProblems';
import type { PostType } from '../../../types/post';

export default function AlgorithmProblemList() {
  const endListRef = useRef(null);
  const [problems, setProblems] = useState<PostType[]>([]);

  // 무한스크롤
  // let debounceTimer = null;
  // const onScroll = () => {
  //   if (debounceTimer) clearTimeout(debounceTimer); // 너무 스크롤 이벤트 많이 발생하는 것 방지
  //   debounceTimer = setTimeout(() => {
  //     console.log('scroll');
  //     const nearBottom =
  //       window.innerHeight + window.scrollY + 100 >
  //       document.documentElement.offsetHeight;
  //     if (nearBottom) {
  //       movieStore.getMovieMore(++page, type, keyword);
  //     }
  //   }, 200);
  // };

  useEffect(() => {
    startTransition(async () => {
      const data = await fetchBjProblems();

      if (data) {
        setProblems(data);
      }
    });
  }, []);

  console.log(problems[0]);

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="알고리즘문제" />
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          <SearchBox />
          <TagSearch />
        </div>
        <div>
          <div className="mb-2">
            <p className="mb-1.5 text-sm md:text-base">선택한 유형</p>
            <div className="flex flex-wrap gap-2.5">
              <TagItem></TagItem>
              <TagItem></TagItem>
            </div>
          </div>
          <div>
            <div className="mb-1">
              <SearchListTop />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {problems &&
                problems.map((problem) => (
                  <AlgorithmListCard problem={problem} />
                ))}

              {/* <AlgorithmListCard />
              <AlgorithmListCard /> */}
            </div>
            <div ref={endListRef}></div>
          </div>
        </div>
      </div>
    </>
  );
}
