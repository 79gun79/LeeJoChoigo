import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { getUser } from '../../api/userApi';
import { getUserChannelPosts } from '../../api/mainApi';
import type { PostsType, User as UserType } from '../../types';
import { getChannelPosts } from '../../api/postApi';

type solvedPostType = { problem_id: number | null }[] | null | undefined;

export default function MainUserInfo() {
  const session = useAuthStore((state) => state.session);
  const isLogin = useAuthStore((state) => state.isLogin);
  const [user, setUser] = useState<UserType>(null);
  const [algorithmPost, setAlgorithmPost] = useState<PostsType>(null);
  const [jobPost, setJobPost] = useState<PostsType>(null);
  const [solvedAlgorithm, setSolvedAlgorithm] = useState<solvedPostType>(null);
  const [solvedJob, setSolvedJob] = useState<solvedPostType>(null);
  useEffect(() => {
    const userInfoFetch = async () => {
      if (!session) return;

      if (session) {
        try {
          const userData = await getUser(session?.user.id);
          const algorithmPostData = await getChannelPosts(1);
          const jobPostData = await getChannelPosts(2);

          setUser(userData);
          setAlgorithmPost(algorithmPostData);
          setJobPost(jobPostData);

          if (userData) {
            const solvedAlgorithmData = await getUserChannelPosts(
              userData?.id,
              3,
            );
            const solvedJobPostData = await getUserChannelPosts(
              userData?.id,
              4,
            );

            if (solvedAlgorithmData) {
              const uniqueAlgorithm = uniquePostId(solvedAlgorithmData);
              setSolvedAlgorithm(uniqueAlgorithm);
            }
            if (solvedJobPostData) {
              const uniqueJob = uniquePostId(solvedJobPostData);
              setSolvedJob(uniqueJob);
            }
          }
        } catch (error) {
          console.error('데이터를 불러오는데 실패 했습니다.', error);
        }
      }
    };
    userInfoFetch();
  }, [session]);

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
      <div className="relative -mt-28 mb-6 box-border h-[150px] rounded-sm bg-white p-5 drop-shadow-md transition-[margin] duration-500 md:order-2 md:mt-0 md:h-full md:w-[320px] md:shrink-0 md:p-6 md:py-7 md:transition-none lg:w-[380px] lg:p-7 lg:py-8">
        {isLogin ? (
          <div className="flex h-full flex-col">
            <p className="flex flex-wrap items-end gap-1 text-sm md:text-base lg:text-lg">
              <User className="h-5 w-5 shrink-0" />
              <span className="relative line-clamp-1 text-base leading-none font-bold md:text-lg lg:text-xl">
                {user?.fullname}
                <span className="bg-sub1/30 absolute -bottom-[2px] -left-[2px] -z-1 h-5/7 w-[calc(100%+4px)]"></span>
              </span>
              <span className="mb-[1px] leading-none">님이 진행하신 내용</span>
            </p>
            <div className="mt-auto flex w-full justify-center gap-7">
              <div className="flex flex-col items-center gap-2">
                <p className="flex items-end gap-0.5 md:text-lg">
                  <span className="text-4xl leading-none font-bold lg:text-5xl">
                    {solvedAlgorithm != null ? solvedAlgorithm?.length : '0'}
                  </span>
                  /<span>{algorithmPost?.length}</span>
                </p>
                <p className="rounded-2xl border border-[#ccc] px-3 py-0.5 text-xs md:px-4 md:text-sm lg:px-5 lg:text-base">
                  알고리즘 문제
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="flex items-end gap-0.5 md:text-lg">
                  <span className="text-4xl leading-none font-bold lg:text-5xl">
                    {solvedJob != null ? solvedJob?.length : '0'}
                  </span>
                  /<span>{jobPost?.length}</span>
                </p>
                <p className="rounded-2xl border border-[#ccc] px-3 py-0.5 text-xs md:px-4 md:text-sm lg:px-5 lg:text-base">
                  개발직군 문제
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3.5">
            <p className="text-gray4 text-center text-sm leading-tight md:text-base lg:text-lg">
              로그인 서비스로 <br />
              나의 진행사항을 알아보세요!
            </p>
            <button className="bg-main rounded-2xl px-3 py-0.5 text-sm text-white md:px-3.5 md:text-base lg:px-5 lg:text-lg">
              로그인
            </button>
          </div>
        )}
      </div>
    </>
  );
}
