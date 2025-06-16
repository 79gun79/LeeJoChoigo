import { useEffect, useState } from 'react';
import { toggleLike } from '../api/postApi';
import { useModalStore } from '../stores/modalStore';
import { useAuthStore } from '../stores/authStore';

type UseLikeProps = {
  postId: number;
  initialLikes: { user: string }[];
};

export function usePostLike({ postId, initialLikes }: UseLikeProps) {
  const session = useAuthStore((state) => state.session);
  const { setLogInModal } = useModalStore();

  const [isLiked, setIsLiked] = useState(false);
  const [likedUsers, setLikedUsers] =
    useState<{ user: string }[]>(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;
    const liked = initialLikes.some((l) => l.user === session.user.id);
    setIsLiked(liked);
  }, [session?.user?.id, initialLikes]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const userId = session?.user?.id;

    if (!userId) {
      setLogInModal(true);
      return;
    }
    if (isLiking) return;

    setIsLiking(true);
    const optimisticLiked = !isLiked;

    setIsLiked(optimisticLiked);
    setLikedUsers((prev) =>
      optimisticLiked
        ? [...prev, { user: userId }]
        : prev.filter((l) => l.user !== userId),
    );

    try {
      await toggleLike(postId, userId);
    } catch (e) {
      console.error('좋아요 실패:', e);
      setIsLiked(!optimisticLiked);
      setLikedUsers((prev) =>
        !optimisticLiked
          ? [...prev, { user: userId }]
          : prev.filter((l) => l.user !== userId),
      );
    } finally {
      setIsLiking(false);
    }
  };

  return { isLiked, likedUsers, isLiking, handleLike };
}
