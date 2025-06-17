import supabase from '../utils/supabase';

export const getChannelPosts = async (channelId: number) => {
  try {
    const { data: posts } = await supabase
      .from('post')
      .select(
        `
        *,
        author:user (*),
        like (
          id,
          user
        ),
        comment (
          id,
          is_yn
        )
      `,
      )
      .eq('channel', channelId)
      .eq('is_yn', true);

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
      .select(
        `
        *,
        author:user (*),
        like (
          id,
          user
        ),
        comment (
          id,
          is_yn
        )
      `,
      )
      .eq('channel', channelId)
      .eq('is_yn', true)
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

export async function createComment({
  postId,
  userId,
  content,
}: {
  postId: number;
  userId: string;
  content: string;
}): Promise<{ id: number }> {
  const { data, error } = await supabase
    .from('comment')
    .insert([
      {
        comment: content,
        post: postId,
        author: userId,
        is_yn: true,
      },
    ])
    .select('id') // id만 반환
    .single(); // 단일 객체 반환

  if (error) throw error;
  return data;
}

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
      .eq('is_yn', true)
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
      is_yn: false,
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
    const { error: notifDeleteError } = await supabase
      .from('notification')
      .delete()
      .eq('like', existing.id);
    if (notifDeleteError) throw notifDeleteError;

    const { error: deleteError } = await supabase
      .from('like')
      .delete()
      .eq('id', existing.id);
    if (deleteError) throw deleteError;
    return false;
  }

  // 좋아요 추가
  const { data: likeData, error: insertError } = await supabase
    .from('like')
    .insert({ post: postId, user: userId })
    .select('id')
    .single();

  if (insertError) throw insertError;

  // 게시글 작성자 조회
  const { data: post } = await supabase
    .from('post')
    .select('author')
    .eq('id', postId)
    .single();

  // 본인 글에 본인이 좋아요 누르면 알림 X
  if (post && post.author !== userId && likeData?.id) {
    const { error: notifError } = await supabase.from('notification').insert([
      {
        actor: userId,
        recipient: post.author,
        type: 'like',
        like: likeData.id,
        post: postId,
        is_seen: false,
        created_at: new Date().toISOString(),
      },
    ]);
    if (notifError) {
      console.error('알림 생성 실패:', notifError);
    } else {
      console.log('알림 생성 성공');
    }
  }

  return true;
};

export const deletePost = async (postId: number, userId: string) => {
  const { error } = await supabase
    .from('post')
    .update({
      is_yn: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', postId)
    .eq('author', userId); // 작성자 본인만 수정

  if (error) throw error;
};
