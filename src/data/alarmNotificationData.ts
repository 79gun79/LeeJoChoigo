// data/alarmNotificationsData.ts
import type { Tables } from '../types/supabase';

const alarmNotificationsData: Tables<'notification'>[] = [
  {
    id: 1,
    actor: '홍asdasdadasd',
    recipient: 'me',
    type: 'comment',
    is_seen: false,
    created_at: new Date().toISOString(),
    comment: null,
    follow: null,
    message: null,
    post: null,
    updated_at: null,
  },
  {
    id: 2,
    actor: '김철수',
    recipient: 'me',
    type: 'follow',
    is_seen: true,
    created_at: new Date().toISOString(),
    comment: null,
    follow: null,
    message: null,
    post: null,
    updated_at: null,
  },
];

export default alarmNotificationsData;
