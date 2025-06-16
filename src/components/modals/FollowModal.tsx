import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import supabase from '../../utils/supabase';
import FollowButton from '../atoms/FollowButton';
import ProfileLinkNavigation from '../atoms/profileLinkNavigation';
import { useLoaderData } from 'react-router';
import type { fetchProfile } from '../../loader/profile.loader';

interface FollowModalProps {
  userId: string;
  type: 'follower' | 'following';
  onClose: () => void;
}

export type User = NonNullable<Awaited<ReturnType<typeof fetchProfile>>>;
export default function FollowModal({
  userId,
  type,
  onClose,
}: FollowModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchFollows = async () => {
      setLoading(true);
      const relationColumn =
        type === 'follower'
          ? 'follower:follow_follower_fkey'
          : 'user:follow_user_fkey';
      const filterColumn = type === 'follower' ? 'user' : 'follower';

      const { data, error } = await supabase
        .from('follow')
        .select(`${relationColumn}(id, fullname, image, email)`)
        .eq(filterColumn, userId);

      if (error) {
        console.error(`${type} 목록을 불러오는데 실패했습니다:`, error);
        setUsers([]);
      } else {
        const extracted = data.map((item: any) =>
          type === 'follower' ? item.follower : item.user,
        );
        setUsers(extracted);
      }

      setLoading(false);
    };

    fetchFollows();
  }, [type, userId]);

  // z-index를 높게 줘도 다른 부모 요소의 stacking context에 갇혀서 겹치는 문제가 생김.
  // React Portal 사용
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
        aria-label="모달 닫기"
      />
      <div className="relative z-10 flex max-h-[55dvh] w-full max-w-sm flex-col rounded-xl bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="t3">
            {type === 'follower' ? '팔로워 목록' : '팔로잉 목록'}
          </h2>
          <button onClick={onClose} className="text-gray3 hover:text-black">
            ✕
          </button>
        </div>
        <hr />

        <div className="mt-2 flex-1 overflow-y-auto pr-1">
          {loading ? (
            <p className="text-gray3 t5 text-center">불러오는 중...</p>
          ) : users.length === 0 ? (
            <p className="text-gray3 t5 text-center">
              {type === 'follower'
                ? '팔로워가 없습니다.'
                : '팔로잉한 유저가 없습니다.'}
            </p>
          ) : (
            <ul className="divide-y">
              {users.map((user) => (
                <li key={user.id} className="flex items-center py-2">
                  <ProfileLinkNavigation
                    fullname={user.fullname}
                    userId={user.id}
                    image={user.image}
                    onClose={onClose}
                    email={user.email}
                  />
                  <FollowButton targetUserId={user.id} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
