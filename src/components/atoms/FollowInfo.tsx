import { useEffect, useState } from 'react';

import supabase from '../../utils/supabase';
import FollowModal from '../modals/FollowModal';
import { useFollowStore } from '../../stores/followStore';

interface FollowInfoProps {
  userId: string;
}

export default function FollowInfo({ userId }: FollowInfoProps) {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const { followMap } = useFollowStore();

  useEffect(() => {
    if (!userId) return;

    const fetchFollowCounts = async () => {
      const [{ count: followers }, { count: followings }] = await Promise.all([
        supabase
          .from('follow')
          .select('*', { count: 'exact', head: true })
          .eq('user', userId),
        supabase
          .from('follow')
          .select('*', { count: 'exact', head: true })
          .eq('follower', userId),
      ]);

      setFollowerCount(followers || 0);
      setFollowingCount(followings || 0);
    };

    fetchFollowCounts();
  }, [userId, followMap]);

  return (
    <>
      <div className="flex gap-8 text-sm md:ml-10 md:text-base lg:text-lg">
        <button
          onClick={() => setOpenFollower(true)}
          className="flex flex-col items-start"
        >
          <span className="font-semibold text-black">{followerCount}</span>
          <span className="text-xs md:text-sm">팔로워</span>
        </button>
        <button
          onClick={() => setOpenFollowing(true)}
          className="flex flex-col items-start"
        >
          <span className="font-semibold text-black">{followingCount}</span>
          <span className="text-xs md:text-sm">팔로잉</span>
        </button>
      </div>

      {openFollower && (
        <FollowModal
          type="follower"
          userId={userId}
          onClose={() => setOpenFollower(false)}
        />
      )}
      {openFollowing && (
        <FollowModal
          type="following"
          userId={userId}
          onClose={() => setOpenFollowing(false)}
        />
      )}
    </>
  );
}
