import type { Tables } from './supabase';

export type Notification = Tables<'notification'> & {
  actor?: {
    id: string;
    fullname: string | null;
    image?: string | null;
  };
  comment?: {
    post: number;
  } | null;
  like?: {
    post: number;
  } | null;
  post?: {
    channel: number;
  } | null;
};
