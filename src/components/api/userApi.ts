import supabase from '../../utils/supabase';

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
