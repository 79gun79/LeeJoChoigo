import supabase from '../utils/supabase';

export const getUserChannelPosts = async (
  userId: string,
  channelId: number,
) => {
  try {
    const { data: posts } = await supabase
      .from('post')
      .select(`problem_id`)
      .eq('author', userId)
      .eq('channel', channelId)
      .not('problem_id', 'is', null);

    return posts;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getPopularPosts = async () => {
  const weekAgoDate = new Date();
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);

  try {
    const { data: posts } = await supabase
      .from('post')
      .select(`*`)
      .in('channel', [3, 4])
      .gte('created_at', weekAgoDate.toISOString())
      .not('problem_id', 'is', null);

    if (posts?.length === 0) {
      const { data: posts } = await supabase
        .from('post')
        .select(`*`)
        .in('channel', [3, 4])
        .not('problem_id', 'is', null);
      return posts;
    }

    return posts;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getPopularPost = async (postId: number) => {
  try {
    const { data: post } = await supabase
      .from('post')
      .select(`*`)
      .eq('id', postId)
      .single();

    return post;
  } catch (e) {
    console.error(e);
  }
};

export const getNewProblems = async () => {
  const weekAgoDate = new Date();
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);

  try {
    const { data: posts } = await supabase
      .from('post')
      .select(`*`)
      .in('channel', [1, 2])
      .gte('created_at', weekAgoDate.toISOString())
      .order('created_at', { ascending: false })
      .limit(2);

    return posts;
  } catch (e) {
    console.error(e);
    return null;
  }
};
