import type { LoaderFunctionArgs } from 'react-router';
import supabase from '../utils/supabase';

export const getPostDetail = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { data, error } = await supabase
      .from('post')
      .select(
        `
        *,
        author:user (
          id,
          fullname,
          image
        ),
        comment!left (
          id,
          is_yn
        ),
        like (
          id,
          user
        )
      `,
      )
      .eq('id', Number(params.id))
      .single();

    if (error) throw error;
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
