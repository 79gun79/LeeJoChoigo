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
  if (followerId === followingId) {
    throw new Error('자기 자신 팔로우함');
  }
  const alreadyFollowing = await checkIsFollowing(followerId, followingId);
  if (alreadyFollowing) return;

  const { data, error } = await supabase
    .from('follow')
    .insert([{ follower: followerId, user: followingId }]);

  if (error) throw error;

  try {
    await supabase.from('notification').insert([
      {
        actor: followerId,
        recipient: followingId,
        type: 'follow',
        is_seen: false,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (notifError) {
    console.warn('알림 생성 실패:', notifError);
  }

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

export const checkIsFollowing = async (
  followerId: string,
  followingId: string,
): Promise<boolean> => {
  const { data, error } = await supabase
    .from('follow')
    .select('id')
    .eq('follower', followerId)
    .eq('user', followingId)
    .maybeSingle();

  if (error) {
    console.error('팔로우 상태 조회 오류:', error);
    return false;
  }

  return !!data;
};
