import supabase from '../utils/supabase';

// 개인이 푼 정보
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
      .eq('is_yn', true)
      .not('problem_id', 'is', null);

    return posts;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getChannelProblemsCount = async (channel: number) => {
  try {
    const { count } = await supabase
      .from('post')
      .select(`*`, { count: 'exact' })
      .eq('channel', channel)
      .eq('is_yn', true);

    return count;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 문제목록
export const getChannelProblems = async (channel: number) => {
  try {
    const { data: posts } = await supabase
      .from('post')
      .select(`*`)
      .eq('channel', channel);
    // .eq('is_yn', true);

    return posts;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getPopularPosts = async () => {
  const weekAgoDate = new Date();
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);
  // 일주일 내의 정보 없으면 전체에서 가져오기
  try {
    const { data: posts } = await supabase
      .from('post')
      .select(`*`)
      .in('channel', [3, 4])
      .eq('is_yn', true)
      .gte('created_at', weekAgoDate.toISOString())
      .not('problem_id', 'is', null);

    if (posts?.length === 0) {
      const { data: posts } = await supabase
        .from('post')
        .select(`*`)
        .in('channel', [3, 4])
        .eq('is_yn', true)
        .not('problem_id', 'is', null);
      return posts;
    }

    return posts;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 인기 문제 가져오기
export const getPopularPost = async (postId: number, channelId: number) => {
  try {
    if (channelId === 3) {
      const { data: post } = await supabase
        .from('post')
        .select(`*`)
        .eq('channel', 1)
        .eq('is_yn', true)
        .eq('solved_problem_id', postId)
        .single();
      return post;
    } else {
      const { data: post } = await supabase
        .from('post')
        .select(`*`)
        .eq('channel', 2)
        .eq('is_yn', true)
        .eq('id', postId)
        .single();
      return post;
    }
  } catch (e) {
    console.error(e);
  }
};

//  새로운 문제
export const getNewProblems = async () => {
  const weekAgoDate = new Date();
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);

  try {
    const { data: posts } = await supabase
      .from('post')
      .select(`*`)
      .in('channel', [1, 2])
      .eq('is_yn', true)
      .gte('created_at', weekAgoDate.toISOString())
      .order('created_at', { ascending: false })
      .limit(2);

    return posts;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 인기 문제 가져오기 (알고리즘 목록에서 사용)
export const getPopularProblem = async (postId: number) => {
  try {
    const { data: post } = await supabase
      .from('post')
      .select(
        `
        *,
        like(
          post,
          user
        )
      `,
      )
      .eq('channel', 1)
      .eq('is_yn', true)
      .eq('solved_problem_id', postId)
      .single();
    return post;
  } catch (e) {
    console.error(e);
  }
};
