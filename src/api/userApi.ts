import supabase from '../utils/supabase';

export const getUser = async (userId: string) => {
  try {
    const { data: user } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    return user;
  } catch (e) {
    console.error(e);
  }
};

export const followUser = async (followerId: string, followingId: string) => {
  const { data, error } = await supabase
    .from('follow')
    .insert([{ follower: followerId, user: followingId }]);
  if (error) throw error;
  return data;
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase
    .from('follow')
    .delete()
    .eq('follower', followerId)
    .eq('user', followingId);
  if (error) throw error;
};
