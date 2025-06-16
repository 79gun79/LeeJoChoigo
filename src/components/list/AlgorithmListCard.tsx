import { Check, Heart } from 'lucide-react';
import { calculateLevel } from '../../utils/calculateLevel';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import { useModalStore } from '../../stores/modalStore';
import { usePostLike } from '../../hooks/usePostLike';
import type { BJPostType, User } from '../../types';
import { useEffect, useState } from 'react';
import { getUser } from '../../api/userApi';

// 임시로 지정한 props 입니다
export default function AlgorithmListCard({
  problem,
}: {
  problem: BJPostType;
}) {
  const session = useAuthStore((state) => state.session);
  const { setLogInModal } = useModalStore();
  const navigate = useNavigate();
  const [isPending, setPending] = useState(false);
  const [me, setMe] = useState<User>(null);
  const { isLiked, likedUsers, handleLike } = usePostLike({
    postId: problem.id,
    initialLikes: problem.like,
  });

  let level = '레벨 없음';
  if (problem.solved_problem_level)
    level = calculateLevel(problem.solved_problem_level);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const myData = await getUser(session?.user.id as string);
        setMe(myData);
      } catch (e) {
        console.error(e);
      } finally {
        setPending(false);
      }
    };
    fetchData();
  }, [session]);

  const problemHandler = () => {
    if (!session?.user.id) {
      setLogInModal(true);
      return;
    }

    navigate(`/solutions/coding/write/${problem.solved_problem_id}`);
  };

  return (
    <>
      {isPending ? (
        <div className="w-full rounded-sm border border-[#ccc]">
          <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
            <div className="mb-2.5 h-3.5 w-2/3 bg-gray-200 md:h-4.5 lg:h-5.5"></div>
            <div className="mb-1 h-3 w-full bg-gray-200 md:h-4 lg:h-5"></div>
            <div className="mb-2.5 h-3 w-4/5 bg-gray-200 md:h-4 lg:h-5"></div>
            <div className="h-2.5 w-1/3 bg-gray-200 md:h-3.5 lg:h-4.5"></div>
          </div>
          <div className="flex w-full border-t border-[#ccc] px-3 py-2 md:px-4 md:py-2.5">
            <div className="h-3 w-1/2 bg-gray-200 md:h-4 lg:h-5"></div>
          </div>
        </div>
      ) : (
        <div
          className="w-full cursor-pointer rounded-sm border border-[#ccc] hover:shadow-md"
          onClick={problemHandler}
        >
          <div className="px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
            <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
              {problem.title}
            </p>
            <p className="mb-2.5 line-clamp-1 h-[22px] text-xs md:text-sm lg:text-base">
              {problem.tags && problem.tags.length > 0
                ? problem.tags?.join(', ')
                : `'${problem.title}' 문제입니다.`}
            </p>
            <div className="flex items-end">
              <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
                {/* 2025.06.06 */}
              </span>
              <div className="ml-auto flex shrink-0 gap-3">
                <div className="flex items-center gap-1">
                  <Heart
                    className={`w-3.5 cursor-pointer transition md:w-4 lg:w-4.5 ${
                      isLiked
                        ? 'fill-[#E95E5E] text-[#E95E5E]'
                        : 'text-[#000000]'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(e);
                    }}
                  />
                  <span className="text-[10px] md:text-xs lg:text-sm">
                    {likedUsers.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center border-t border-[#ccc] px-3 py-2 md:px-4 md:py-2.5">
            <p className="text-xs md:text-sm lg:text-base">{level}</p>

            {(me?.solved ?? []).includes(problem?.solved_problem_id || 0) && (
              <p className="ml-auto flex items-center gap-1 text-[10px] md:text-xs lg:text-sm">
                <Check className="w-4 text-[var(--color-green-info)] md:w-5 lg:w-6" />
                풀이됨
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
