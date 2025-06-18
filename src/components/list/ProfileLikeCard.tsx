import { Heart, MessageSquare } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import dateFormat from '../../utils/dateFormat';
import { useNavigate } from 'react-router';
import { previewMarkdown } from '../../utils/markdown';
import type { ProfileLikes } from '../profile/ProfileList';
import { useEffect, useState } from 'react';
import {
  fetchProfilePostComments,
  fetchProfilePostLikes,
} from '../../loader/profile.loader';
import { useModalStore } from '../../stores/modalStore';
import { toggleLike } from '../../api/postApi';

export default function ProfileLikeCard({
  data,
  profileUserId,
}: {
  data: ProfileLikes[number];
  profileUserId: string;
}) {
  const { id, post } = data; //id는 좋아요 id
  const [commentCount, setCommentCount] = useState(0);
  const session = useAuthStore((state) => state.session);
  const [isLiked, setIsLiked] = useState(false);
  const [likedUsers, setLikedUsers] = useState<{ user: string }[]>([]);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchPostComment = async () => {
      try {
        const resultsData = await fetchProfilePostComments(post.id);
        setCommentCount(resultsData?.length || 0);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
    };

    fetchPostComment();
  }, [post.id]);

  const channelLocation = (channel: number) => {
    switch (channel) {
      case 2:
        return '/problems/job';
      case 3:
        return '/solutions/coding';
      case 4:
        return '/solutions/job';
      case 5:
        return '/questions';
    }
  };
  const { setLogInModal } = useModalStore();
  const navigate = useNavigate();

  const problemHandler = (path: string) => {
    if (!session?.user) {
      setLogInModal(true);
      return;
    }
    navigate(path);
  };

  useEffect(() => {
    const postLikes = async () => {
      try {
        const resultData = await fetchProfilePostLikes(post.id);

        if (!session?.user?.id || !resultData) return;
        const liked = resultData.some((l) => l.user === session.user.id);
        setIsLiked(liked);
        setLikedUsers(resultData);
      } catch (error) {
        console.error(error);
      }
    };
    postLikes();
  }, [post.id, session?.user?.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session?.user?.id) {
      setLogInModal(true);
      return;
    }
    if (isLiking) return;

    setIsLiking(true);
    const userId = session.user.id || profileUserId;
    const optimisticLiked = !isLiked;

    setIsLiked(optimisticLiked);
    setLikedUsers((prev) =>
      optimisticLiked
        ? [...prev, { user: userId }]
        : prev.filter((l) => l.user !== userId),
    );

    try {
      await toggleLike(data.post.id, userId);
    } catch (e) {
      console.error('좋아요 실패:', e);
      setIsLiked(!optimisticLiked);
      setLikedUsers((prev) =>
        !optimisticLiked
          ? [...prev, { user: userId }]
          : prev.filter((l) => l.user !== userId),
      );
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <>
      {/* 로그인 되어 있는 경우에는 좋아요 삭제시 안보이게.. */}
      {session?.user ? (
        isLiked && (
          <div className="w-full rounded-sm border border-[#ccc]">
            <button
              className="h-full w-full text-left"
              onClick={() =>
                problemHandler(`${channelLocation(post.channel)}/${id}`)
              }
            >
              <div className="flex h-full w-full flex-col px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
                <div className="flex w-full gap-2.5">
                  <div className="w-full min-w-0">
                    <p
                      className={`lg: mb-2 text-sm text-[10px] font-semibold md:text-xs ${
                        post.channel === 2
                          ? 'text-[#014195]'
                          : post.channel === 3
                            ? 'text-main'
                            : post.channel === 4
                              ? 'text-sub1'
                              : 'text-green-info'
                      }`}
                    >
                      {post.channel === 2
                        ? '개발직군 문제'
                        : post.channel === 3
                          ? '알고리즘 풀이'
                          : post.channel === 4
                            ? '개발직군 풀이'
                            : '질문'}
                    </p>
                    <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
                      {post.title}
                    </p>
                    <p className="mb-2.5 line-clamp-2 text-xs md:text-sm lg:text-base">
                      {post.content
                        ? previewMarkdown(post.content).slice(0, 100)
                        : ''}
                    </p>
                  </div>
                  {post.image && (
                    <div className="ml-auto h-[65px] w-[85px] shrink-0 overflow-hidden md:h-[75px] md:w-[105px] lg:h-[85px] lg:w-[125px]">
                      <img
                        src={post.image}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <ul className="mt-auto mb-2.5 flex gap-3">
                  {post.tags &&
                    post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm"
                      >
                        {tag}
                      </li>
                    ))}
                </ul>
                <div className="mt-auto flex items-end">
                  <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
                    {dateFormat(post.created_at)}
                  </span>
                  <div className="ml-auto flex shrink-0 gap-3">
                    <div className="flex items-center gap-1">
                      <Heart
                        onClick={handleLike}
                        className={`w-3.5 md:w-4 lg:w-4.5 ${isLiked && 'cursor-pointer fill-[#E95E5E] text-[#E95E5E]'}`}
                      />
                      <span className="text-[10px] md:text-xs lg:text-sm">
                        {session?.user ? likedUsers.length : post.like_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 md:w-4 lg:w-4.5" />
                      <span className="text-[10px] md:text-xs lg:text-sm">
                        {commentCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        )
      ) : (
        <div className="w-full rounded-sm border border-[#ccc]">
          <button
            className="h-full w-full text-left"
            onClick={() =>
              problemHandler(`${channelLocation(post.channel)}/${id}`)
            }
          >
            <div className="flex h-full w-full flex-col px-3 pt-3.5 pb-3 md:px-4 md:pt-4 md:pb-3.5">
              <div className="flex w-full gap-2.5">
                <div className="w-full min-w-0">
                  <p
                    className={`lg: mb-2 text-sm text-[10px] font-semibold md:text-xs ${
                      post.channel === 2
                        ? 'text-[#014195]'
                        : post.channel === 3
                          ? 'text-main'
                          : post.channel === 4
                            ? 'text-sub1'
                            : 'text-green-info'
                    }`}
                  >
                    {post.channel === 2
                      ? '개발직군 문제'
                      : post.channel === 3
                        ? '알고리즘 풀이'
                        : post.channel === 4
                          ? '개발직군 풀이'
                          : '질문'}
                  </p>
                  <p className="mb-2.5 text-sm font-semibold md:text-base lg:text-lg">
                    {post.title}
                  </p>
                  <p className="mb-2.5 line-clamp-2 text-xs md:text-sm lg:text-base">
                    {post.content
                      ? previewMarkdown(post.content).slice(0, 100)
                      : ''}
                  </p>
                </div>
                {post.image && (
                  <div className="ml-auto h-[65px] w-[85px] shrink-0 overflow-hidden md:h-[75px] md:w-[105px] lg:h-[85px] lg:w-[125px]">
                    <img
                      src={post.image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <ul className="mt-auto mb-2.5 flex gap-3">
                {post.tags &&
                  post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm"
                    >
                      {tag}
                    </li>
                  ))}
              </ul>
              <div className="mt-auto flex items-end">
                <span className="text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
                  {dateFormat(post.created_at)}
                </span>
                <div className="ml-auto flex shrink-0 gap-3">
                  <div className="flex items-center gap-1">
                    <Heart
                      onClick={handleLike}
                      className={`w-3.5 md:w-4 lg:w-4.5 ${isLiked && 'cursor-pointer fill-[#E95E5E] text-[#E95E5E]'}`}
                    />
                    <span className="text-[10px] md:text-xs lg:text-sm">
                      {session?.user ? likedUsers.length : post.like_count}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 md:w-4 lg:w-4.5" />
                    <span className="text-[10px] md:text-xs lg:text-sm">
                      {commentCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
