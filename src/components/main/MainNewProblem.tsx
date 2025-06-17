import { useEffect, useState } from 'react';
import { getNewProblems } from '../../api/mainApi';
import { Link } from 'react-router';
import { SquarePen } from 'lucide-react';

export type NewProblemsType = Awaited<ReturnType<typeof getNewProblems>>;
export default function MainNewProblem() {
  const [newProblem, setNewProblem] = useState<NewProblemsType>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newProblemFetch = async () => {
      setIsLoading(true);
      try {
        const newData = await getNewProblems();
        setNewProblem(newData);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
    };

    newProblemFetch();
  }, []);

  return (
    <>
      <div className="md:w-full">
        <div className="mb-3 flex gap-1.5">
          ✨
          <div>
            <p className="content-title">최신 문제</p>
            <p className="content-title-sub">새로운 문제를 풀어보세요</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {isLoading ? (
            [...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-sm border border-[#ccc] p-3 md:p-4"
              >
                <div className="mb-3 h-3 w-1/5 animate-pulse rounded-sm bg-gray-200 md:h-4 lg:h-5"></div>
                <div className="mb-3 h-4 w-3/5 animate-pulse rounded-sm bg-gray-200 md:h-5 lg:h-6"></div>
                <div className="mb-1 h-3 w-4/5 animate-pulse rounded-sm bg-gray-200 md:h-4 lg:h-5"></div>
                <div className="h-3 w-2/5 animate-pulse rounded-sm bg-gray-200 md:h-4 lg:h-5"></div>
              </div>
            ))
          ) : newProblem && newProblem.length !== 0 ? (
            newProblem.map((problem, i) => {
              const linkTo =
                problem.channel === 2
                  ? `/problems/job/${problem.id}`
                  : `/solutions/coding/write/${problem.id}`;
              return (
                <Link
                  to={linkTo}
                  key={i}
                  className="hover-box dark:bg-bg-white flex flex-col gap-1.5 rounded-sm border border-[#ccc] p-3 md:p-4"
                >
                  <p
                    className={`line-clamp-1 text-xs font-semibold md:text-sm lg:text-base ${problem.channel === 1 && 'text-main'} ${problem.channel === 2 && 'text-sub1'} `}
                  >
                    {problem.channel === 2 && `개발직군 문제 - ${problem.tags}`}
                    {problem.channel === 1 && '알고리즘 문제'}
                  </p>
                  <p className="hover line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                    {problem.title}
                  </p>
                  <p className="line-clamp-2 text-xs md:min-h-[2.8em] md:text-sm lg:text-base">
                    {problem.content}
                  </p>
                  {problem.channel === 1 && (
                    <ul className="mb-2.5 flex gap-1.5">
                      {problem.tags?.map((tag, index) => (
                        <li
                          key={tag + index}
                          className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              );
            })
          ) : (
            <div className="text-gray2 flex h-[300px] w-full flex-col items-center justify-center gap-3 text-center text-sm md:col-span-2">
              <SquarePen className="h-10 w-10" />
              <p>새로운 문제가 없습니다.</p>
              <Link
                to="/problems/write"
                className="bg-main rounded-sm px-2.5 py-1 text-[10px] font-light text-white md:text-xs lg:text-sm"
              >
                문제 생성하러 가기
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
