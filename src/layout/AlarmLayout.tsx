import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import AlarmListItems from '../components/atoms/AlarmListItems';
import type { Tables } from '../types/supabase';
import { useAuthStore } from '../stores/authStore';
import alarmNotificationsData from '../data/alarmNotificationData';

type Notification = Tables<'notification'>;

export default function AlarmLayout() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const bellRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isLogin) {
      setNotifications(alarmNotificationsData);
    } else {
      setNotifications([]);
    }
  }, [isLogin]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (open && !bellRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (!isLogin) return null;

  const unreadCount = notifications.filter((n) => !n.is_seen).length;

  return (
    <div className="relative">
      <button
        ref={bellRef}
        onClick={() => setOpen((v) => !v)}
        className="relative"
        aria-label="알림"
      >
        <Bell />
        {notifications.some((n) => !n.is_seen) && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {open && (
        <div
          className="absolute -right-10 z-50 mt-2 w-[250px] max-w-[90vw] rounded-xl bg-white drop-shadow-md md:right-0 md:w-[400px]"
          style={{ minWidth: '220px' }}
        >
          <div className="border-gray4 flex items-center justify-between border-b px-4 py-3">
            <span className="t2">
              알림
              <span className="t5 bg-main ml-2 rounded-2xl px-2 text-white">
                {unreadCount}
              </span>
            </span>
            <button
              className="text-gray3 hover:text-black"
              onClick={() => setOpen(false)}
              aria-label="알림 닫기"
            >
              ✕
            </button>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <AlarmListItems
              notifications={notifications}
              onClickItem={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
