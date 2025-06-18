import { useLoaderData, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import type { CommentType, PostDetailType } from '../../../types';
import { useAuthStore } from '../../../stores/authStore';
import { getCommentDetail } from '../../../api/postApi';
import PageName from '../../../components/ui/PageName';
import DetailText from '../../../components/detail/DetailText';
import CommentEdit from '../../../components/detail/CommentEdit';
import CommentItem from '../../../components/detail/CommentItem';
import Loading from '../../../components/ui/Loading';

export default function QuizSolutionDetail() {
  const { id } = useParams<{ id: string }>();
  const post = useLoaderData<PostDetailType>();

  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const session = useAuthStore((state) => state.session);

  const fetchComments = async () => {
    const res = await getCommentDetail(Number(id));
    setComments(res);
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchComments();
    setLoading(false);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
          <div className="mb-[25px] md:mb-[35px]">
            <PageName title="개발직군 풀이" />
          </div>
          <div className="mb-[20px] md:mb-[30px]">
            <DetailText data={post} />
          </div>
          <div className="mb-[25px] md:mb-[35px]">
            {post && (
              <p className="mb-2.5 text-xs md:text-sm lg:text-base">
                {comments?.length ?? 0}개의 댓글
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
      )}
    </>
  );
}
