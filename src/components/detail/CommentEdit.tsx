import Avartar from '../ui/Avartar';

import { useState } from 'react';

import supabase from '../../utils/supabase';
import { createComment } from '../../api/postApi';

type Props = {
  postId: number;
  onCommentAdd: () => void;
};

export default function CommentEdit({ postId, onCommentAdd }: Props) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (!userId) {
        alert('로그인이 필요합니다.');
        return;
      }

      await createComment({
        postId,
        userId,
        content,
      });

      setContent('');
      onCommentAdd();
    } catch (err) {
      console.error('댓글 등록 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-3 rounded-sm border border-[#ccc] p-3">
        <div className="mb-2.5">
          <Avartar />
        </div>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="mb-2.5 h-[50px] w-full resize-none overflow-auto"
            placeholder="댓글을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button className="rounded-sm bg-[var(--color-main)] px-2 py-1 text-[10px] text-white md:px-2.5 md:text-xs lg:px-3 lg:text-sm">
              {loading ? '등록 중...' : '등록'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
