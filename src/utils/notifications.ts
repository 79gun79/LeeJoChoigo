import type { Notification } from '../types/notification';
import supabase from './supabase';
export const getChannelPath = (channelId: number) => {
  switch (channelId) {
    case 1:
      return '/problems/coding';
    case 2:
      return '/problems/job';
    case 3:
      return '/solution/coding';
    case 4:
      return '/solution/job';
    case 5:
      return '/questions';
    default:
      return '/';
  }
};

export const getNotificationLink = (n: Notification): string | undefined => {
  const basePath = n.post?.channel ? getChannelPath(n.post.channel) : undefined;
  if (n.type === 'comment' && n.comment) return `${basePath}/${n.comment.post}`;
  if (n.type === 'like' && n.like) return `${basePath}/${n.like.post}`;
  if (n.type === 'follow' && n.actor?.id) return `/profile/${n.actor.id}`;
  return undefined;
};

export const getNotificationMessage = (n: Notification): string => {
  const actorName = n.actor?.fullname || '알 수 없음';
  switch (n.type) {
    case 'comment':
      return `[${actorName}]님이 새 댓글을 달았습니다.`;
    case 'follow':
      return `[${actorName}]님이 팔로우했습니다.`;
    case 'like':
      return `[${actorName}]님이 게시글을 좋아합니다.`;
    default:
      return '새 알림이 있습니다.';
  }
};

export const markAsRead = async (id: number) => {
  await supabase.from('notification').update({ is_seen: true }).eq('id', id);
};

export const fetchNotifications = async (userId: string) => {
  return supabase
    .from('notification')
    .select(
      `*, actor:user!actor ( id, fullname, image ), comment ( post ), like ( post ), post (channel )`,
    )
    .eq('recipient', userId)
    .order('created_at', { ascending: false });
};
