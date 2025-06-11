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
