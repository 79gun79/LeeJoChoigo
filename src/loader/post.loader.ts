import type { LoaderFunctionArgs } from 'react-router';
import supabase from '../utils/supabase';

export const getPostDetail = async ({ params }: LoaderFunctionArgs) => {
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
        comment!left (
          id,
          is_yn
        ),
        like (
          id,
          user
        )
      `,
      )
      .eq('id', Number(params.id))
      .single();

    if (error) throw error;

    let parent = null;
    if (data && data.problem_id) {
      let parentPost, parentError;

      if (data.channel === 3) {
        ({ data: parentPost, error: parentError } = await supabase
          .from('post')
          .select('channel, solved_problem_id, title, content, quiz_data, id')
          .eq('channel', 1)
          .eq('id', data.problem_id)
          .single());
      } else if (data.channel === 4) {
        ({ data: parentPost, error: parentError } = await supabase
          .from('post')
          .select('channel, solved_problem_id, title, content, quiz_data, id')
          .eq('channel', 2)
          .eq('id', data.problem_id)
          .single());
      }

      if (parentError) {
        console.error('부모 포스트를 찾을 수 없습니다:', parentError.message);
      } else {
        parent = parentPost;
      }
    }
    return { ...data, parent };
  } catch (e) {
    console.error(e);
    return null;
  }
};

// export const getBJSolveDetail = async ({ params }: LoaderFunctionArgs) => {
//   try {
//     const post = await getPostDetail({ params } as LoaderFunctionArgs);

//     let parent = null;
//     if (post && post.problem_id) {
//       const { data: parentPost, error: parentError } = await supabase
//         .from('post')
//         .select('title, content')
//         .eq('solved_problem_id', post.problem_id)
//         .single();

//       if (parentError) {
//         console.error('부모 포스트를 찾을 수 없습니다:', parentError.message);
//       } else {
//         parent = parentPost;
//       }
//     }
//     return { ...post, parent };
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };
