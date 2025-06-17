import { useEffect, useState } from 'react';
import { getChannelProblems } from '../../api/mainApi';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import type { User } from '../../types';
import type { PostType } from '../../types/post';
import { calculateLevel } from '../../utils/calculateLevel';
import { previewMarkdown } from '../../utils/markdown';

export default function MainRecommand({
  user,
  isUserLoading,
}: {
  user: User;
  isUserLoading: boolean;
}) {
  const [isActive, setIsActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [randomAlgorithms, setRandomAlgorithms] = useState<PostType[]>();
  const [randomJobs, setRandomJobs] = useState<PostType[]>();

  useEffect(() => {
    const postsFetch = async () => {
      setIsLoading(true);

      try {
        const algos = await getChannelProblems(1);
        const jobs = await getChannelProblems(2);

        const filterAlgos = algos?.filter(
          (f) =>
            !user?.solved?.find((item) => item === f.id) && f.is_yn !== false,
        );
        const filterjobs = jobs?.filter(
          (f) =>
            !user?.solved?.find((item) => item === f.id) && f.is_yn !== false,
        );

        const randomAlgos = filterAlgos ? randomArray(filterAlgos) : [];
        const randomJobs = filterjobs ? randomArray(filterjobs) : [];

        setRandomAlgorithms(randomAlgos);
        setRandomJobs(randomJobs);

        setIsLoading(false);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
    };
    // User 로딩이 끝났을때
    if (!isUserLoading) postsFetch();
  }, [user?.solved, isUserLoading]);

  const randomArray = (array: PostType[]) => {
    let total = 3;
    const tempArray = [...array];
    const newArray = [];

    if (array.length < 3) {
      total = array.length;
    }

    // 문제 중복 방지
    while (newArray.length < total) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      newArray.push(tempArray.splice(randomIndex, 1)[0]);
    }
    return newArray;
  };
  return (
    <>
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
              <div className="absolute top-[44px] left-0 flex w-full flex-col gap-2.5 md:static md:gap-0">
                {isLoading || isUserLoading
                  ? [...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:p-4 ${i !== 2 && 'md:border-b'}`}
                      >
                        <div className="mb-2.5 h-3.5 w-1/5 animate-pulse rounded-sm bg-gray-200 md:h-4 lg:h-5"></div>
                        <div className="mb-2.5 h-4 w-3/5 animate-pulse rounded-sm bg-gray-200 md:h-5 lg:h-6"></div>
                        <div className="h-3 w-4/5 animate-pulse rounded-sm bg-gray-200 md:h-4 lg:h-5"></div>
                      </div>
                    ))
                  : randomAlgorithms &&
                    randomAlgorithms.map((problem, index) => (
                      <Link
                        to={`/solutions/coding/write/${problem.solved_problem_id}`}
                        key={index}
                        className={`md-hover-none hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:py-4 ${index + 1 !== randomAlgorithms.length && 'md:border-b'}`}
                      >
                        <p className="text-main line-clamp-1 text-xs font-semibold md:text-sm">
                          {calculateLevel(Number(problem.solved_problem_level))}
                        </p>
                        <p className="hover line-clamp-1 text-sm font-bold md:text-base">
                          {problem.title}
                        </p>
                        <p className="line-clamp-1 text-xs md:text-sm">
                          {problem.tags}
                        </p>
                      </Link>
                    ))}
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
              className="bg-gray1 group-[.active]:bg-sub1 w-full rounded-sm py-1.5 text-center text-sm group-[.active]:text-white md:cursor-auto! md:rounded-none md:border-b md:border-[#ccc] md:bg-transparent md:px-7 md:py-4 md:text-left md:text-base md:group-[.active]:bg-transparent md:group-[.active]:text-black lg:text-lg"
            >
              개발직군 문제
            </button>
            <div className="hidden group-[.active]:block md:block md:px-4">
              <div className="absolute top-[44px] left-0 flex w-full flex-col gap-2.5 md:static md:gap-0">
                {isLoading || isUserLoading
                  ? [...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:p-4 ${i !== 2 && 'md:border-b'}`}
                      >
                        <div className="mb-2.5 h-3.5 w-1/5 animate-pulse rounded-sm bg-gray-200 md:h-4 lg:h-5"></div>
                        <div className="mb-2.5 h-4 w-3/5 animate-pulse rounded-sm bg-gray-200 md:h-5 lg:h-6"></div>
                        <div className="h-3 w-4/5 animate-pulse rounded-sm bg-gray-200 md:h-4 lg:h-5"></div>
                      </div>
                    ))
                  : randomJobs &&
                    (randomJobs.length !== 0 ? (
                      randomJobs.map((problem, index) => (
                        <Link
                          to={`/problems/job/${problem?.id}`}
                          key={index}
                          className={`md-hover-none hover-box flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:rounded-none md:border-0 md:py-4 ${index + 1 !== randomJobs.length && 'md:border-b'}`}
                        >
                          <p className="text-sub1 line-clamp-1 text-xs font-semibold md:text-sm">
                            {problem.tags}
                          </p>
                          <p className="hover line-clamp-1 text-sm font-bold md:text-base">
                            {problem.title}
                          </p>
                          <p className="line-clamp-1 text-xs md:text-sm">
                            {problem.content
                              ? previewMarkdown(problem.content).slice(0, 100)
                              : ''}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <div className="text-gray3 flex h-[300px] w-full flex-col items-center justify-center gap-3 text-center text-sm md:col-span-2">
                        <span className="text-5xl">🥳</span>
                        <p>
                          모든 문제를 마스터 하셨습니다! <br /> 더 이상 추천
                          해드릴 문제가 없습니다!
                        </p>
                      </div>
                    ))}
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
    </>
  );
}
