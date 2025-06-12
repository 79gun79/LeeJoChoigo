import type { LoaderFunctionArgs } from 'react-router';
import supabase from '../utils/supabase';

export const fetchPostDetail = async ({ params }: LoaderFunctionArgs) => {
  // 1번 채널: 문제게시판 - 알고리즘
  try {
    const { data: post } = await supabase
      .from('post')
      .select(
        `
    *,
    user (
      id,
      fullname,
      image
    )
  `,
      )
      .eq('id', Number(params.id))
      .single();

    return post;
  } catch (e) {
    console.error(e);
  }
};
