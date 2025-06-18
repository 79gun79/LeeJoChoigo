import supabase from './supabase';

const LIMIT = 50;

export const fetchBjProblems = async (
  page: number,
  orderBy: string,
  ascending: boolean,
  query?: string,
  tags?: string[],
) => {
  try {
    const from = page * LIMIT;
    const to = from + LIMIT - 1;

    let bjProblems = supabase
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
      .eq('channel', 1);

    if (query) {
      bjProblems = bjProblems.ilike('title', `%${query}%`);
    }

    if (tags && tags.length > 0) {
      const allTags = tags.map((v) => `tags.cs.{${v}}`).join(',');
      bjProblems = bjProblems.or(allTags);
    }

    const { data: post, error } = await bjProblems
      .order(orderBy, { ascending })
      .range(from, to);

    if (error) {
      console.error('문제 데이터 불러오는 것을 실패했습니다.', error);
    }

    console.log(`${page} 페이지 불러오기 완료`);
    return post;
  } catch (error) {
    console.error('문제 데이터 불러오는 중에 에러가 발생했습니다.', error);
  }
};
