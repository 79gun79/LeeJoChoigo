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

export const fetchProfilePost = async (id: string) => {
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
      .eq('author', String(id))
      .order('created_at', { ascending: false });

    return post;
  } catch (e) {
    console.error(e);
  }
};

export const fetchProfileComments = async (id: string) => {
  try {
    const { data: post } = await supabase
      .from('comment')
      .select(
        `
        *,
        post (*)
        `,
      )
      .eq('author', String(id))
      .order('created_at', { ascending: false });

    return post;
  } catch (e) {
    console.error(e);
  }
};
