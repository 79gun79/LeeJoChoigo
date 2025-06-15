import { useState } from 'react';

export default function HandleToggleFollow() {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsFollowing(!isFollowing)}
        className={`rounded-sm px-2 py-0.5 text-[10px] text-white md:text-xs lg:text-sm ${isFollowing ? 'bg-gray3' : 'bg-main'}`}
      >
        {isFollowing ? '언팔로우' : '팔로우'}
      </button>
    </>
  );
}
