import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import FollowButton from '../atoms/FollowButton';

interface FollowModalProps {
  userId: string;
  type: 'follower' | 'following';
  onClose: () => void;
}

interface UserInfo {
  id: string;
  fullname: string;
  image: string | null;
}

export default function FollowModal({
  userId,
  type,
  onClose,
}: FollowModalProps) {
  const [users, setUsers] = useState<UserInfo[]>([]);
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
        .select(`${relationColumn}(id, fullname, image)`)
        .eq(filterColumn, userId);

      if (error) {
        console.error(`${type} 목록을 불러오는데 실패했습니다:`, error);
        setUsers([]);
      } else {
        // 관계 필드만 추출
        const extracted = data.map((item: any) =>
          type === 'follower' ? item.follower : item.user,
        );
        setUsers(extracted);
      }

      setLoading(false);
    };

    fetchFollows();
  }, [type, userId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="t3">
            {type === 'follower' ? '팔로워 목록' : '팔로잉 목록'}
          </h2>
          <button onClick={onClose} className="text-gray3 hover:text-black">
            ✕
          </button>
        </div>
        <hr />

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
              <>
                <li key={user.id} className="flex items-center gap-3 py-2">
                  <img
                    src={
                      user.image ||
                      'https://www.studiopeople.kr/common/img/default_profile.png'
                    }
                    alt={user.fullname}
                    className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10"
                  />
                  <span className="t4">{user.fullname}</span>

                  <FollowButton targetUserId={user.id} />
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
