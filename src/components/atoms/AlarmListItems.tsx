import { useNavigate } from 'react-router';
import type { Notification } from '../../types/notification';
import dateFormat from '../../utils/dateFormat';
import {
  getNotificationLink,
  getNotificationMessage,
  markAsRead,
} from '../../utils/notifications';

interface AlarmListItemsProps {
  notifications: Notification[];
  onClickItem?: (notification: Notification) => void;
}

export default function AlarmListItems({
  notifications,
  onClickItem,
}: AlarmListItemsProps) {
  const navigate = useNavigate();

  if (!notifications.length) {
    return (
      <div className="t5 text-gray3 p-4 text-center">알림이 없습니다.</div>
    );
  }

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
            onClick={async () => {
              if (!n.is_seen) await markAsRead(n.id);
              if (link) navigate(link);
              onClickItem?.(n);
            }}
          >
            <div className="t5 flex items-center justify-between">
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
