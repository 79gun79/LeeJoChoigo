import { useParams } from 'react-router';
import CommentEdit from '../../components/detail/CommentEdit';
import CommentItem from '../../components/detail/CommentItem';
import DetailText from '../../components/detail/DetailText';
import PageName from '../../components/ui/PageName';
import { useEffect, useState } from 'react';
import { getCommentDetail, getPostDetail } from '../../components/api/postApi';
import type { CommentType, PostDetailType } from '../../types';
import { useAuthStore } from '../../stores/authStore';

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetailType | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const session = useAuthStore((state) => state.session);

  const fetchPost = async () => {
    const res = await getPostDetail(Number(id));
    setPost(res);
  };

  const fetchComments = async () => {
    const res = await getCommentDetail(Number(id));
    setComments(res);
  };

  useEffect(() => {
    if (!id) return;
    fetchPost();
    fetchComments();
  }, [id]);

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="질문 게시판" />
        </div>
        {post && <DetailText data={post} />}
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
                await fetchPost();
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
                  await fetchPost();
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
