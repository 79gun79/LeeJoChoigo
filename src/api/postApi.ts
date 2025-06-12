import supabase from '../utils/supabase';

export const getChannelPosts = async (channelId: number) => {
  try {
    const { data: posts } = await supabase
      .from('post')
      .select('*')
      .eq('channel', channelId);

    return posts;
  } catch (e) {
    console.error(e);
  }
};

export const getChannelCategoryPosts = async (
  channelId: number,
  category: string,
) => {
  try {
    const { data: posts } = await supabase
      .from('post')
      .select('*')
      .eq('channel', channelId)
      .contains('tags', [category]);

    return posts;
  } catch (e) {
    console.error(e);
  }
};

export const getPost = async (postId: number) => {
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
      .eq('id', postId)
      .single();

    return post;
  } catch (e) {
    console.error(e);
  }
};
