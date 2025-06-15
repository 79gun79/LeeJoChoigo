import { useState } from 'react';
import { followUser, unfollowUser } from '../../api/userApi';
import supabase from '../../utils/supabase';

export default function FollowButton({
  targetUserId,
  isFollowingInitial,
}: {
  targetUserId: string;
  isFollowingInitial: boolean;
}) {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [loading, setLoading] = useState(false);

  const handleToggleFollow = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const myId = userData.user?.id;
    if (!myId) {
      alert('로그인이 필요합니다.');
      setLoading(false);
      return;
    }
    try {
      if (isFollowing) {
        await unfollowUser(myId, targetUserId);
      } else {
        await followUser(myId, targetUserId);
      }
      setIsFollowing(!isFollowing);
    } catch (e) {
      console.error('팔로우 처리 실패', e);
      alert('팔로우 처리 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFollow}
      disabled={loading}
      className={`rounded-md px-2 py-0.5 text-sm ${
        isFollowing ? 'bg-gray3 text-white' : 'bg-main text-white'
      } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {loading ? '처리 중...' : isFollowing ? '언팔로우' : '팔로우'}
    </button>
  );
}
