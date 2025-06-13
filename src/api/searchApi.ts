import supabase from '../utils/supabase';

export const searchPosts = async (query: string) => {
  try {
    const { data: posts } = await supabase
      .from('post')
      .select('*')
      .ilike('channel', `%${query}%`);

    return posts;
  } catch (e) {
    console.error(e);
  }
};
