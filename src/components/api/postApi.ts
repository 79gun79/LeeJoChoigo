import supabase from '../../utils/supabase';

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

export const getPostDetail = async (postId: number) => {
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
        comment (
          id
        ),
        like (
          id,
          user
        )
      `,
      )
      .eq('id', postId)
      .single();

    if (error) throw error;
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createComment = async ({
  postId,
  userId,
  content,
}: {
  postId: number;
  userId: string;
  content: string;
}) => {
  const { data, error } = await supabase.from('comment').insert([
    {
      comment: content,
      post: postId,
      author: userId,
    },
  ]);

  if (error) throw error;
  return data;
};

export const getCommentDetail = async (postId: number) => {
  try {
    const { data, error } = await supabase
      .from('comment')
      .select(
        `
        id,
        comment,
        created_at,
        updated_at,
        author:user (
          id,
          fullname,
          image
        )
      `,
      )
      .eq('post', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteComment = async (commentId: number) => {
  const { error } = await supabase
    .from('comment')
    .update({
      comment: '삭제된 댓글입니다.',
      updated_at: new Date().toISOString(),
    })
    .eq('id', commentId);

  if (error) throw error;
};

export const toggleLike = async (postId: number, userId: string) => {
  const { data: existing, error } = await supabase
    .from('like')
    .select('id')
    .eq('post', postId)
    .eq('user', userId)
    .maybeSingle();

  if (error) throw error;

  if (existing) {
    const { error: deleteError } = await supabase
      .from('like')
      .delete()
      .eq('id', existing.id);
    if (deleteError) throw deleteError;
    return false;
  }

  const { error: insertError } = await supabase
    .from('like')
    .insert({ post: postId, user: userId });
  if (insertError) throw insertError;
  return true;
};
