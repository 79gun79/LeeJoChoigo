import { ChevronDown, ChevronRight, Heart, NotebookPen } from 'lucide-react';
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
import FollowButton from '../atoms/FollowButton';
import { deletePost, toggleLike } from '../../api/postApi';
import { useNavigate } from 'react-router';
import { getChannelPath } from '../../utils/channelPath';
import { notify } from '../../utils/customAlert';
import ProfileLinkNavigation from '../atoms/profileLinkNavigation';
import QuizShowComponent from '../edit/QuizShowComponent';
import type { QuizItem } from '../../types/quizList';
import { twMerge } from 'tailwind-merge';
import QuizSolveComponent from './QuizSolveComponent';

export default function DetailText({
  data,
  answerConfirm,
}: {
  data: PostDetailType;
  answerConfirm?: boolean;
}) {
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
    if (!currentUserId) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (isLiking) return;

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
    if ([3, 4].includes(data.channel))
      navigate(
        `${getChannelPath(data.channel)}/write/${data.problem_id}?id=${data.id}`,
      );
    else navigate(`${getChannelPath(data.channel)}/write?id=${data.id}`);
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

  // 유저가 선택한 답
  const quizSolveData = (data.quiz_data ?? []) as QuizItem[]; // 문제 가져오기
  const [userChoose, setUserChoose] = useState<string[][]>(
    quizSolveData.map(() => []),
  );

  // 유저가 선택한 답 체크
  const selectHandler = useCallback((index: number, selectId: string) => {
    setUserChoose((choose) =>
      choose.map((v, i) =>
        i === index
          ? v.includes(selectId)
            ? v.filter((id) => id !== selectId)
            : [...v, selectId]
          : v,
      ),
    );
  }, []);
  const [forceShow, setForceShow] = useState(false);

  const isAuthor = currentUserId === data.author?.id;

  return (
    <>
      {/* 게시글 상단 */}
      <div className="border-b-gray2 border-b">
        <p className="mb-2.5 text-lg font-semibold md:text-xl lg:text-2xl">
          {data.title}
        </p>
        <div className="flex items-end pb-3.5">
          <div className="flex items-center gap-2.5 md:gap-3 lg:gap-3.5">
            <ProfileLinkNavigation
              fullname={data.author.fullname}
              userId={data.author.id}
              image={data.author.image}
            />
            <FollowButton targetUserId={data.author.id} />
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
                <ul className="border-b-gray4 rounded-sm border py-[20px]">
                  <li
                    className={`flex cursor-pointer list-none items-center justify-between pt-[4px] ${isShow && 'pb-[16px]'}`}
                    onClick={() => setIsShow(!isShow)}
                  >
                    <div className="t4 font-bold">
                      "백준 {data.parent.solved_problem_id}번 :{' '}
                      {data.parent.title}" 문제 보기
                    </div>{' '}
                    {!isShow && (
                      <ChevronRight size={24} className="mr-[20px]" />
                    )}
                    {isShow && <ChevronDown size={24} className="mr-[20px]" />}
                  </li>
                  <li className={`list-none pr-[25px] ${!isShow && 'hidden'}`}>
                    <ProblemDescRender isHeadingHidden={true}>
                      {data.parent.content}
                    </ProblemDescRender>
                  </li>
                </ul>
              )}
            {data.parent &&
              data.parent.quiz_data &&
              data.parent.title &&
              data.parent.id && (
                <div className="mb-[25px] flex flex-col gap-[10px] md:mb-[35px]">
                  <div className="flex gap-[10px]">
                    <div className="flex-grow"></div>
                    <button
                      onClick={() => setForceShow(!forceShow)}
                      className={
                        forceShow ? 'button-sm gray2 h-6' : 'button-sm h-6'
                      }
                    >
                      {forceShow ? '모두 닫기' : '모두 열기'}
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/problems/job/${data.parent?.id}`)
                      }
                      className={twMerge('button-sm', 'h-6')}
                    >
                      <NotebookPen className="h-[14px] w-[12px] shrink-0" />
                      문제 풀러가기
                    </button>
                  </div>
                  {(data.parent.quiz_data as QuizItem[]).map((v, i) => (
                    <QuizShowComponent
                      key={i}
                      index={i}
                      item={v}
                      forceShow={forceShow}
                    />
                  ))}
                </div>
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
        {/* 문제 설명 컴포넌트 */}
        {data.quiz_data && (
          <>
            <div className="mb-[10px] flex justify-end md:mb-[15px]">
              <button
                onClick={() => setForceShow(!forceShow)}
                className={forceShow ? 'button-sm gray2 h-6' : 'button-sm h-6'}
              >
                {forceShow ? '모두 닫기' : '모두 열기'}
              </button>
            </div>
            <div className="mb-[25px] flex flex-col gap-[10px] md:mb-[35px]">
              {/* <p className="t3">{data.title}의 퀴즈</p> */}
              {quizSolveData.map((v, i) => (
                <QuizSolveComponent
                  key={i}
                  index={i}
                  item={v}
                  choose={userChoose[i]}
                  onSelect={(id) => selectHandler(i, id)}
                  showRes={answerConfirm!}
                  forceShow={forceShow}
                />
              ))}
            </div>
          </>
        )}

        <div className="mb-3 flex gap-2">
          <div className="mx-auto flex shrink-0 gap-3">
            <div className="flex flex-col items-center gap-1">
              <Heart
                size={20}
                onClick={handleLike}
                className={`cursor-pointer transition ${
                  isLiked ? 'fill-[#E95E5E] text-[#E95E5E]' : 'text-black'
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
