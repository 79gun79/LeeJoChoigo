import Avartar from '../ui/Avartar';
import type { CommentType } from '../../types';

import { deleteComment } from '../../api/postApi';
import dateFormat from '../../utils/dateFormat';
import { notify } from '../../utils/customAlert';

type Props = {
  data: CommentType;
  onDelete: () => void;
  isAuthor: boolean;
};

export default function CommentItem({ data, onDelete, isAuthor }: Props) {
  const { id, comment, created_at, updated_at, author } = data;
  const date = updated_at ? updated_at : created_at;

  const handleDelete = async () => {
    try {
      await deleteComment(id);
      onDelete();
      notify('댓글 삭제 성공', 'success');
    } catch (e) {
      console.error('댓글 삭제 실패:', e);
      notify('댓글 삭제 실패', 'error');
    }
  };
  return (
    <>
      <div className="border-b border-[#ccc] py-2.5">
        <div className="mb-2.5 flex items-center">
          <Avartar user={author} profileLink />
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
          {dateFormat(date)}
        </p>
      </div>
    </>
  );
}
