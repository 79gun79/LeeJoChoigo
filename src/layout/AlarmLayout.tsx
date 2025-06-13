import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import AlarmListItems from '../components/atoms/AlarmListItems';
import { useAuthStore } from '../stores/authStore';
import supabase from '../utils/supabase';
import type { Notification } from '../types/notification';
import { fetchNotifications, markAsRead } from '../utils/notifications';

export default function AlarmLayout() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const bellRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setNotifications([]);
        return;
      }

      const { data, error } = await fetchNotifications(user.id);
      if (error) {
        console.error('알림 불러오기 실패:', error);
      } else {
        setNotifications(data ?? []);
      }
    };

    if (isLogin) {
      fetch();
    } else {
      setNotifications([]);
    }
  }, [isLogin]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        !bellRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleRead = async (id: number) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_seen: true } : n)),
    );
  };

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
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute -right-10 z-50 mt-2 w-[250px] max-w-[90vw] rounded-xl bg-white drop-shadow-md md:right-0 md:w-[350px]"
          style={{ minWidth: '220px' }}
        >
          <div className="border-gray4 flex items-center justify-between border-b px-4 py-3">
            <span className="t3">
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
              onClickItem={async (n) => {
                if (!n.is_seen) await handleRead(n.id);
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
