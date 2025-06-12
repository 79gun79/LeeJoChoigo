// data/alarmNotificationsData.ts
import type { Tables } from '../types/supabase';

const alarmNotificationsData: Tables<'notification'>[] = [
  {
    id: 1,
    actor: '홍asdasdadasd',
    recipient: '2dcc7f8d-f519-40e9-906d-316657e1549c',
    type: 'comment',
    is_seen: false,
    created_at: new Date().toISOString(),
    comment: null,
    follow: null,
    message: null,
    post: 32492,
    updated_at: null,
  },
  {
    id: 2,
    actor: '2dcc7f8d-f519-40e9-906d-316657e1549c',
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
