import { Heart, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { CommentType, PostDetailType } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import dateFormat from '../../utils/dateFormat';
import { toggleLike } from '../../api/postApi'; // 중복 방지: postApi의 toggleLike만 사용

export default function DetailText({
  data,
  hideComment,
}: {
  data: PostDetailType;
  hideComment?: boolean;
}) {
  const [likedUsers, setLikedUsers] = useState<CommentType>(data.like || []);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const checkIsLiked = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) return;

      const liked = likedUsers.some((l: { user: string }) => l.user === userId);
      setIsLiked(liked);
    };

    checkIsLiked();
  }, [likedUsers]);

  const handleLike = useCallback(async () => {
    if (isLiking) return;
    setIsLiking(true);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) {
      alert('로그인이 필요합니다.');
      setIsLiking(false);
      return;
    }

    const optimisticLiked = !isLiked;

    setIsLiked(optimisticLiked);
    setLikedUsers((prev: { user: string }[]) =>
      optimisticLiked
        ? [...prev, { user: userId }]
        : prev.filter((l) => l.user !== userId),
    );

    try {
      // 좋아요 토글 및 알림 생성은 postApi의 toggleLike 함수에서 처리
      await toggleLike(data.id, userId);
    } catch (e) {
      console.error('좋아요 처리 실패:', e);
      setIsLiked(!optimisticLiked);
      setLikedUsers((prev: { user: string }[]) =>
        !optimisticLiked
          ? [...prev, { user: userId }]
          : prev.filter((l) => l.user !== userId),
      );
    } finally {
      setIsLiking(false);
    }
  }, [isLiked, isLiking, data.id]);

  return (
    <>
      {/* 게시글 상단 */}
      <div className="border-b border-[#ccc]">
        <p className="mb-2.5 text-lg font-semibold md:text-xl lg:text-2xl">
          {data.title}
        </p>
        <div className="flex items-end pb-3.5">
          <div className="flex items-center gap-2.5 md:gap-3 lg:gap-3.5">
            <div className="h-[32px] w-[32px] overflow-hidden rounded-full border border-[#eee] md:h-[36px] md:w-[36px] lg:h-[40px] lg:w-[40px]">
              <img
                className="h-full w-full object-cover"
                src={
                  data.author?.image ||
                  'https://www.studiopeople.kr/common/img/default_profile.png'
                }
              />
            </div>
            <div>
              <p className="text-xs text-[#464646] md:text-sm lg:text-base">
                {data.author.fullname}
              </p>
              <button className="rounded-sm bg-[var(--color-gray4)] px-2 py-0.5 text-[10px] text-white md:text-xs lg:text-sm">
                팔로우
              </button>
            </div>
          </div>
          <p className="ml-auto text-right text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
            {dateFormat(data.created_at)}
          </p>
        </div>
      </div>
      <div className="py-7">
        <div className="mb-7 text-xs md:text-sm lg:text-base">
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {data.content ?? ''}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex gap-2">
          {data.tags &&
            data.tags.map((tag: string, i: number) => (
              <p
                key={i}
                className="rounded-sm bg-[var(--color-gray1)] px-2 py-0.5 text-[10px] text-[var(--color-gray4)] md:text-xs lg:text-sm"
              >
                {tag}
              </p>
            ))}
        </div>
      </div>
      {/* 게시글 하단 */}
      <div className="flex w-full border-t border-[#ccc] py-2.5">
        <div className="ml-auto flex shrink-0 gap-3">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <Heart
                onClick={handleLike}
                className={`w-3.5 cursor-pointer transition md:w-4 lg:w-4.5 ${
                  isLiked ? 'fill-[#E95E5E] text-[#E95E5E]' : 'text-[#000000]'
                }`}
              />
              <span className="text-[10px] md:text-xs lg:text-sm">
                {likedUsers.length}
              </span>
            </div>
          </div>
          {!hideComment && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 md:w-4 lg:w-4.5" />
              <span className="text-[10px] md:text-xs lg:text-sm">
                {
                  data.comment.filter(
                    (c: { is_yn: boolean }) => c.is_yn !== false,
                  ).length
                }
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
