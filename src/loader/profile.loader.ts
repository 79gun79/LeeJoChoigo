import type { LoaderFunctionArgs } from 'react-router';
import supabase from '../utils/supabase';

export const fetchProfile = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { data: user } = await supabase
      .from('user')
      .select(
        `
        fullname,
        email,
        cover_image,
        image,
        auth_type,
        id
        `,
      )
      .eq('id', String(params.userId))
      .single();

    return user;
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserPosts = async (userId: string) => {
  try {
    const { data: post } = await supabase
      .from('post')
      .select(
        `
        *,
        like (
         *
        ),
        comment (
          *
        )
        `,
      )
      .eq('author', userId)
      .eq('is_yn', true)
      .order('created_at', { ascending: false });

    return post;
  } catch (e) {
    console.error(e);
  }
};
export const fetchUserChannelPosts = async (
  userId: string,
  channel: number,
) => {
  try {
    const { data: post } = await supabase
      .from('post')
      .select(
        `
        *,
        like (
         *
        ),
        comment (
          *
        )
        `,
      )
      .eq('author', userId)
      .eq('is_yn', true)
      .eq('channel', channel)
      .order('created_at', { ascending: false });

    return post;
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserComments = async (userId: string) => {
  try {
    const { data: comments } = await supabase
      .from('comment')
      .select(
        `
        *,
        post(*)
        `,
      )
      .eq('author', userId)
      .eq('is_yn', true)
      .order('created_at', { ascending: false });

    return comments;
  } catch (e) {
    console.error(e);
  }
};
export const fetchUserChannelComments = async (
  userId: string,
  channel: number,
) => {
  try {
    const { data: comments } = await supabase
      .from('comment')
      .select(
        `
        *,
        post!inner(*)
        `,
      )
      .eq('author', userId)
      .eq('is_yn', true)
      .eq('post.channel', channel)
      .order('created_at', { ascending: false });

    return comments;
  } catch (e) {
    console.error(e);
  }
};

// 특정유저의 모든채널 좋아요
export const fetchUserLikes = async (userId: string) => {
  try {
    const { data: likes } = await supabase
      .from('like')
      .select(
        `
        *,
        post!inner(*)
        `,
      )
      .eq('user', userId)
      .eq('post.is_yn', true)
      .order('created_at', { ascending: false });

    return likes;
  } catch (e) {
    console.error(e);
  }
};
// 특정유저의 특정 채널 좋아요
export const fetchUserChannelLikes = async (
  userId: string,
  channel: number,
) => {
  try {
    const { data: likes } = await supabase
      .from('like')
      .select(
        `
        *,
        post!inner(*)
        `,
      )
      .eq('user', userId)
      .eq('post.channel', channel)
      .eq('post.is_yn', true)
      .order('created_at', { ascending: false });

    return likes;
  } catch (e) {
    console.error(e);
  }
};

// postId에 해당하는 좋아요
export const fetchProfilePostLikes = async (postId: number) => {
  try {
    const { data: like } = await supabase
      .from('like')
      .select(
        `
       user
        `,
      )
      .eq('post', postId)
      .order('created_at', { ascending: false });

    return like;
  } catch (e) {
    console.error(e);
  }
};

// postId에 해당하는 댓글
export const fetchProfilePostComments = async (postId: number) => {
  try {
    const { data: comments } = await supabase
      .from('comment')
      .select(
        `
        *
        `,
      )
      .eq('post', postId)
      .order('created_at', { ascending: false });

    return comments;
  } catch (e) {
    console.error(e);
  }
};
