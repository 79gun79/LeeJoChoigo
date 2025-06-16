import { useEffect, useState } from 'react';
import { toggleLike } from '../api/postApi';
import { useModalStore } from '../stores/modalStore';
import { useAuthStore } from '../stores/authStore';
import { useLocation } from 'react-router';
import { useProblemStore } from '../stores/problemStore';

type UseLikeProps = {
  postId: number;
  initialLikes: { user: string }[];
};

export function usePostLike({ postId, initialLikes }: UseLikeProps) {
  const session = useAuthStore((state) => state.session);
  const { setLogInModal } = useModalStore();
  const updateProblemLike = useProblemStore((state) => state.updateProblemLike);
  const isBJLists = useLocation().pathname.startsWith('/problems/coding');

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
    if (isBJLists) {
      const optimisticLikes = optimisticLiked
        ? [
            ...likedUsers.map((l) => ({ ...l, post: postId })),
            { post: postId, user: userId },
          ]
        : likedUsers
            .filter((l) => l.user !== userId)
            .map((l) => ({ ...l, post: postId }));

      updateProblemLike(postId, optimisticLikes);
    }

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
      if (isBJLists) {
        const rolledBackLikes = !optimisticLiked
          ? [
              ...likedUsers.map((l) => ({ ...l, post: postId })),
              { post: postId, user: userId },
            ]
          : likedUsers
              .filter((l) => l.user !== userId)
              .map((l) => ({ ...l, post: postId }));

        updateProblemLike(postId, rolledBackLikes);
      }
    } finally {
      setIsLiking(false);
    }
  };

  return { isLiked, likedUsers, handleLike };
}
