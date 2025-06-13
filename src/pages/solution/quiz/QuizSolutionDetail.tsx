import { useLoaderData, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import type { CommentType, PostDetailType } from '../../../types';
import { useAuthStore } from '../../../stores/authStore';
import { getCommentDetail, getPost } from '../../../api/postApi';
import PageName from '../../../components/ui/PageName';
import DetailText from '../../../components/detail/DetailText';
import CommentEdit from '../../../components/detail/CommentEdit';
import CommentItem from '../../../components/detail/CommentItem';
import QuizShowComponent from '../../../components/edit/QuizShowComponent';
import type { QuizItem } from '../../../types/quizList';

export default function QuizSolutionDetail() {
  const { id } = useParams<{ id: string }>();
  const post = useLoaderData<PostDetailType>();

  const [quiz, setQuiz] = useState<QuizItem[] | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const session = useAuthStore((state) => state.session);

  const fetchComments = async () => {
    const res = await getCommentDetail(Number(id));
    setComments(res);
  };
  const fetchQuiz = async () => {
    const res = await getPost(post.solved_problem_level);
    setQuiz((res?.quiz_data || []) as QuizItem[]);
  };

  useEffect(() => {
    if (!id) return;
    fetchQuiz();
    fetchComments();
  }, [id]);

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="개발직군 풀이" />
        </div>
        {/* 문제 상세 설명 */}
        <div className="mb-[25px] md:mb-[35px]">
          <DetailText data={post} />
        </div>
        <div className="mb-[25px] flex flex-col gap-[10px] md:mb-[35px]">
          {quiz &&
            quiz.map((v, i) => (
              <QuizShowComponent key={i} index={i} item={v} />
            ))}
        </div>
        <div className="mb-[25px] md:mb-[35px]">
          {post && (
            <p className="mb-2.5 text-xs md:text-sm lg:text-base">
              {
                post.comment.filter(
                  (c: { is_yn: boolean }) => c.is_yn !== false,
                ).length
              }
              개의 댓글
            </p>
          )}
          {post && (
            <CommentEdit
              postId={post.id}
              onCommentAdd={async () => {
                await fetchComments();
              }}
            />
          )}
          {comments?.map((comment) => {
            const isAuthor = session?.user.id === comment.author?.id;

            return (
              <CommentItem
                key={comment.id}
                data={comment}
                isAuthor={isAuthor}
                onDelete={async () => {
                  await fetchComments();
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
