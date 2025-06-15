import { ChevronDown, ChevronRight, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { CommentType, PostDetailType } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import dateFormat from '../../utils/dateFormat';

import '../../styles/markdown.css';
import 'highlight.js/styles/github.css';
import ProblemDescRender from '../common/ProblemDescRender';
import { deletePost, toggleLike } from '../../api/postApi';
import { useNavigate } from 'react-router';
import { getChannelPath } from '../../utils/channelPath';
import { notify } from '../../utils/customAlert';

export default function DetailText({ data }: { data: PostDetailType }) {
  const [likedUsers, setLikedUsers] = useState<CommentType>(data.like || []);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    const liked = likedUsers.some(
      (l: { user: string }) => l.user === currentUserId,
    );
    setIsLiked(liked);
  }, [likedUsers, currentUserId]);

  const handleLike = useCallback(async () => {
    if (isLiking || !currentUserId) {
      alert('로그인이 필요합니다.');
      return;
    }

    setIsLiking(true);
    const optimisticLiked = !isLiked;

    setIsLiked(optimisticLiked);
    setLikedUsers((prev: { user: string }[]) =>
      optimisticLiked
        ? [...prev, { user: currentUserId }]
        : prev.filter((l) => l.user !== currentUserId),
    );

    try {
      await toggleLike(data.id, currentUserId);
    } catch (e) {
      console.error('좋아요 처리 실패:', e);
      setIsLiked(!optimisticLiked);
      setLikedUsers((prev: { user: string }[]) =>
        !optimisticLiked
          ? [...prev, { user: currentUserId }]
          : prev.filter((l) => l.user !== currentUserId),
      );
    } finally {
      setIsLiking(false);
    }
  }, [isLiked, isLiking, currentUserId, data.id]);

  const handleEdit = () => {
    navigate(`${getChannelPath(data.channel)}/write?id=${data.id}`);
  };

  const handleDelete = async () => {
    if (!currentUserId) return;

    try {
      await deletePost(data.id, currentUserId);
      notify('삭제되었습니다', 'success');

      navigate(getChannelPath(data.channel));
    } catch (e) {
      console.log('실패 : ', e);
      notify('삭제에 실패했습니다.', 'error');
    }
  };

  const isAuthor = currentUserId === data.author?.id;

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
            {data.parent &&
              data.parent.solved_problem_id &&
              data.parent.title &&
              data.parent.content && (
                <ul className="rounded-sm border border-[#DEDEDE] py-[20px]">
                  <li
                    className={`flex cursor-pointer list-none items-center gap-[5px] pt-[4px] ${isShow && 'pb-[16px]'}`}
                    onClick={() => setIsShow(!isShow)}
                  >
                    {!isShow && <ChevronRight size={22} />}
                    {isShow && <ChevronDown size={22} />}
                    <div className="">
                      "백준 {data.parent.solved_problem_id}번 :{' '}
                      {data.parent.title}" 문제 보기
                    </div>
                  </li>
                  <li className={`list-none px-[30px] ${!isShow && 'hidden'}`}>
                    <ProblemDescRender isHeadingHidden={true}>
                      {data.parent.content}
                    </ProblemDescRender>
                  </li>
                </ul>
              )}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({ className = '', children, ...props }) {
                  const match = /language-(\w+)/.exec(className);
                  const lang = match?.[1];

                  if (match) {
                    return (
                      <div className="relative mb-4">
                        <div className="absolute top-0 left-0 px-2 py-1 text-xs font-medium text-black">
                          {lang}
                        </div>
                        <pre>
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {data.content ?? ''}
            </ReactMarkdown>
          </div>
        </div>
        <div className="mb-3 flex gap-2">
          <div className="mx-auto flex shrink-0 gap-3">
            <div className="flex flex-col items-center gap-1">
              <Heart
                size={20}
                onClick={handleLike}
                className={`cursor-pointer transition ${
                  isLiked ? 'fill-[#E95E5E] text-[#E95E5E]' : 'text-[#000000]'
                }`}
              />
              <span className="text-[10px] md:text-xs lg:text-sm">
                {likedUsers.length}
              </span>
            </div>
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
      {isAuthor && (
        <div className="flex w-full gap-2 border-t border-[#ccc]">
          <div className="flex-grow"></div>
          <button
            onClick={handleEdit}
            className="text-gray4 px-[10px] py-[6px] text-[10px] md:text-xs lg:text-sm"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="px-[10px] py-[6px] text-[10px] text-[#FF6d6d] md:text-xs lg:text-sm"
          >
            삭제
          </button>
        </div>
      )}
    </>
  );
}
