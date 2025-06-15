import Avartar from '../ui/Avartar';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { createComment } from '../../api/postApi';
import { getUser } from '../../api/userApi';
import type { User } from '../../types';

type Props = {
  postId: number;
  onCommentAdd: () => void;
};

export default function CommentEdit({ postId, onCommentAdd }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const hasCmt = content.trim().length > 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData.user?.id;
        const profile = await getUser(userId || '');
        setUser(profile);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

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

      // 1. 댓글 생성
      const comment = await createComment({
        postId,
        userId,
        content,
      });

      // 2. 게시글 정보 조회 (작성자 id 필요)
      const { data: post } = await supabase
        .from('post')
        .select('author')
        .eq('id', postId)
        .single();

      // 3. 본인 글에 본인이 댓글 달면 알림 X
      if (post && post.author !== userId && comment?.id) {
        await supabase.from('notification').insert([
          {
            actor: userId,
            recipient: post.author,
            type: 'comment',
            comment: comment.id,
            post: postId,
            is_seen: false,
            created_at: new Date().toISOString(),
          },
        ]);
      }

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
      <div
        className={`mb-3 rounded-sm border ${hasCmt ? 'border-gray4' : 'border-[#ccc]'} p-3`}
      >
        <div className="mb-2.5">
          {user && <Avartar user={user} />}
          {!user && <Avartar />}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="mb-2.5 h-[50px] w-full resize-none overflow-auto outline-none"
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
