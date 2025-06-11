import supabase from './supabase';

export const fetchBjProblems = async () => {
  try {
    const { data: post, error } = await supabase
      .from('post')
      .select('*')
      .eq('channel', 1)
      // .range(page, page + 99);

    if (error) {
      console.error('문제 데이터 불러오는 것을 실패했습니다.', error);
    }

    return post;
  } catch (error) {
    console.error('문제 데이터 불러오는 중에 에러가 발생했습니다.', error);
  }
};
