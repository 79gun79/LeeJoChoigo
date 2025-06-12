import Avartar from '../ui/Avartar';
import type { CommentType } from '../../types';
import { format, formatDistanceToNow, differenceInHours } from 'date-fns';
import { ko } from 'date-fns/locale';
import { deleteComment } from '../../api/postApi';

type Props = {
  data: CommentType;
  onDelete: () => void;
  isAuthor: boolean;
};

export default function CommentItem({ data, onDelete, isAuthor }: Props) {
  const { id, comment, created_at, updated_at, author } = data;
  const date = updated_at ? new Date(updated_at) : new Date(created_at);
  const hourDiff = differenceInHours(new Date(), date);

  const displayTime =
    hourDiff < 24
      ? formatDistanceToNow(date, { addSuffix: true, locale: ko })
      : format(date, 'yyyy-MM-dd');

  const handleDelete = async () => {
    const confirmed = window.confirm('댓글을 삭제할까요?');
    if (!confirmed) return;

    try {
      await deleteComment(id);
      onDelete();
    } catch (e) {
      console.error('댓글 삭제 실패:', e);
    }
  };
  return (
    <>
      <div className="border-b border-[#ccc] py-2.5">
        <div className="mb-2.5 flex items-center">
          <Avartar user={author} />
          {isAuthor && (
            <button
              onClick={handleDelete}
              className="ml-auto text-[10px] text-[#FF6363] md:text-xs lg:text-sm"
            >
              삭제
            </button>
          )}
        </div>
        <p className="mb-2.5 text-xs md:text-sm lg:text-base">{comment}</p>
        <p className="text-right text-[10px] text-[var(--color-gray3)] md:text-xs lg:text-sm">
          {displayTime}
        </p>
      </div>
    </>
  );
}
