import { useEffect, useState } from 'react';
import { followUser, unfollowUser, checkIsFollowing } from '../../api/userApi';
import supabase from '../../utils/supabase';

export default function FollowButton({
  targetUserId,
}: {
  targetUserId: string;
}) {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const myId = userData.user?.id;
      if (!myId || myId === targetUserId) {
        setLoading(false);
        return;
      }

      const result = await checkIsFollowing(myId, targetUserId);
      setIsFollowing(result);
      setLoading(false);
    };

    fetchFollowStatus();
  }, [targetUserId]);

  const handleToggleFollow = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const myId = userData.user?.id;
    if (!myId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      setLoading(true);
      if (isFollowing) {
        await unfollowUser(myId, targetUserId);
      } else {
        await followUser(myId, targetUserId);
      }
      setIsFollowing((prev) => !prev);
    } catch (e) {
      console.error('Follow Error', e);
      alert('팔로우 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (targetUserId === undefined) return null;
  return (
    <button
      onClick={handleToggleFollow}
      disabled={loading}
      className={`t4 rounded-md px-2 py-0.5 ${
        isFollowing ? 'bg-gray3 text-white' : 'bg-main text-white'
      } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {loading ? '처리 중...' : isFollowing ? '언팔로우' : '팔로우'}
    </button>
  );
}
