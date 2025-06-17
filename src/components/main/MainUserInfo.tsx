import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { getChannelProblems, getUserChannelPosts } from '../../api/mainApi';
import type { User as UserType } from '../../types';
import { Link, useNavigate } from 'react-router';

type solvedPostType = { problem_id: number | null }[];
type ProblemsType = Awaited<ReturnType<typeof getChannelProblems>>;

export default function MainUserInfo({
  user,
  isLogin,
  isUserLoading,
}: {
  user: UserType;
  isLogin: boolean;
  isUserLoading: boolean;
}) {
  const session = useAuthStore((state) => state.session);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [algorithmPost, setAlgorithmPost] = useState<ProblemsType>();
  const [jobPost, setJobPost] = useState<ProblemsType>();
  const [solvedAlgorithm, setSolvedAlgorithm] = useState<solvedPostType>();
  const [solvedJob, setSolvedJob] = useState<solvedPostType>();
  useEffect(() => {
    const userInfoFetch = async () => {
      if (!session) return;
      setIsLoading(true);
      if (session) {
        try {
          const algorithmPostData = await getChannelProblems(1);
          const jobPostData = await getChannelProblems(2);

          setAlgorithmPost(algorithmPostData);
          setJobPost(jobPostData);

          if (user) {
            const solvedAlgorithmData = await getUserChannelPosts(user?.id, 3);
            const solvedJobPostData = await getUserChannelPosts(user?.id, 4);

            const uniqueAlgorithm = solvedAlgorithmData
              ? uniquePostId(solvedAlgorithmData)
              : [];

            const uniqueJob = solvedJobPostData
              ? uniquePostId(solvedJobPostData)
              : [];
            setSolvedAlgorithm(uniqueAlgorithm);
            setSolvedJob(uniqueJob);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('데이터를 불러오는데 실패 했습니다.', error);
        }
      }
    };
    // User 로딩이 끝났을때
    if (!isUserLoading) userInfoFetch();
  }, [user, session, isUserLoading]);

  // 푼 문제 중복제거
  const uniquePostId = (problemList: solvedPostType) => {
    const uniqueList = problemList.filter((f, i) => {
      return (
        problemList.findIndex((f2) => {
          return f.problem_id === f2.problem_id;
        }) === i
      );
    });
    return uniqueList;
  };

  return (
    <>
      <div className="dark:bg-bg-white relative -mt-28 mb-6 box-border h-[150px] rounded-sm bg-white p-5 drop-shadow-md transition-[margin] duration-500 md:order-2 md:mt-0 md:h-full md:w-[320px] md:shrink-0 md:p-6 md:py-7 md:transition-none lg:w-[380px] lg:p-7 lg:py-8">
        {isLogin ? (
          isLoading || isUserLoading ? (
            <div className="flex h-full flex-col justify-between">
              <div className="h-5 w-4/5 animate-pulse rounded-sm bg-gray-200 md:h-6"></div>
              <div className="flex justify-around">
                <div className="h-17 w-2/5 animate-pulse rounded-sm bg-gray-200"></div>
                <div className="h-17 w-2/5 animate-pulse rounded-sm bg-gray-200"></div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <p className="flex flex-wrap items-end gap-1 text-sm md:text-base lg:text-lg">
                <User className="h-5 w-5 shrink-0" />
                <span className="relative line-clamp-1 text-base leading-none font-bold md:text-lg lg:text-xl">
                  {user?.fullname}
                  <span className="bg-sub1/30 absolute -bottom-[2px] -left-[2px] -z-1 h-5/7 w-[calc(100%+4px)]"></span>
                </span>
                <span className="mb-[1px] leading-none">
                  님이 진행하신 내용
                </span>
              </p>
              <div className="mt-auto flex w-full justify-center gap-7">
                <Link
                  to={`/profile/${session?.user.id}`}
                  state={{ menu: 3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <p className="flex items-end gap-0.5 md:text-lg">
                    <span className="text-4xl leading-none font-bold lg:text-5xl">
                      {solvedAlgorithm != null ? solvedAlgorithm?.length : 0}
                    </span>
                    /<span>{algorithmPost?.length}</span>
                  </p>
                  <p className="rounded-2xl border border-[#ccc] px-3 py-0.5 text-xs md:px-4 md:text-sm lg:px-5 lg:text-base">
                    알고리즘 문제
                  </p>
                </Link>
                <Link
                  to={`/profile/${session?.user.id}`}
                  state={{ menu: 4 }}
                  className="flex flex-col items-center gap-2"
                >
                  <p className="flex items-end gap-0.5 md:text-lg">
                    <span className="text-4xl leading-none font-bold lg:text-5xl">
                      {solvedJob != null ? solvedJob?.length : 0}
                    </span>
                    /<span>{jobPost?.length}</span>
                  </p>
                  <p className="rounded-2xl border border-[#ccc] px-3 py-0.5 text-xs md:px-4 md:text-sm lg:px-5 lg:text-base">
                    개발직군 문제
                  </p>
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3.5">
            <p className="text-gray4 text-center text-sm leading-tight md:text-base lg:text-lg">
              로그인 서비스로 <br />
              나의 진행사항을 알아보세요!
            </p>
            <button
              onClick={() =>
                navigate('/login', { state: { from: location.pathname } })
              }
              className="bg-main rounded-2xl px-3 py-0.5 text-sm text-white md:px-3.5 md:text-base lg:px-5 lg:text-lg"
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </>
  );
}
