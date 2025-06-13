import { useNavigate } from 'react-router';
import type { Notification } from '../../types/notification';
import dateFormat from '../../utils/dateFormat';

interface AlarmListItemsProps {
  notifications: Notification[];
  onClickItem?: (notification: Notification) => void;
}

export default function AlarmListItems({
  notifications,
  onClickItem,
}: AlarmListItemsProps) {
  const navigate = useNavigate();

  // 알림 타입별로 이동할 링크 생성 함수
  const getNotificationLink = (n: Notification) => {
    if (n.type === 'comment' && n.comment) return `/problems/${n.comment.post}`;
    if (n.type === 'like' && n.like) return `/problems/${n.like.post}`;
    if (n.type === 'follow' && n.actor?.id) return `/profile/${n.actor.id}`;
    return undefined;
  };

  if (!notifications.length) {
    return (
      <div className="t5 text-gray3 p-4 text-center">알림이 없습니다.</div>
    );
  }

  const getNotificationMessage = (n: Notification) => {
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

  return (
    <ul>
      {notifications.map((n) => {
        const link = getNotificationLink(n);
        return (
          <li
            key={n.id}
            className={`border-gray3 cursor-pointer border-b px-4 py-3 last:border-b-0 ${
              n.is_seen ? 'text-gray3' : ''
            }`}
            onClick={() => {
              if (link) navigate(link);
              onClickItem?.(n);
            }}
          >
            <div className="t4 flex items-center justify-between">
              <span>{getNotificationMessage(n)}</span>
              <span className="t5 text-gray2 whitespace-nowrap">
                {dateFormat(n.created_at)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
