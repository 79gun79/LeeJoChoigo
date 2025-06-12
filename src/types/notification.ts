import type { Tables } from './supabase';

export type Notification = Tables<'notification'> & {
  actor?: {
    id: string;
    fullname: string | null;
    image?: string | null;
  };
};
