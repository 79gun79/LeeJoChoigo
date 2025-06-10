import supabase from '../utils/supabase';

export const fetchChannel1 = async () => {
  // 1번 채널: 문제게시판 - 알고리즘
  try {
    const { data: channel } = await supabase
      .from('channel')
      .select('*')
      .eq('id', 1)
      .single();

    return channel;
  } catch (e) {
    console.error(e);
  }
};

export const fetchChannel2 = async () => {
  // 2번 채널: 문제게시판 - 개발직군
  try {
    const { data: channel } = await supabase
      .from('channel')
      .select('*')
      .eq('id', 2)
      .single();

    return channel;
  } catch (e) {
    console.error(e);
  }
};

export const fetchChannel3 = async () => {
  // 3번 채널: 풀이게시판 - 알고리즘
  try {
    const { data: channel } = await supabase
      .from('channel')
      .select('*')
      .eq('id', 3)
      .single();

    return channel;
  } catch (e) {
    console.error(e);
  }
};

export const fetchChannel4 = async () => {
  // 4번 채널: 풀이게시판 - 개발직군
  try {
    const { data: channel } = await supabase
      .from('channel')
      .select('*')
      .eq('id', 4)
      .single();

    return channel;
  } catch (e) {
    console.error(e);
  }
};

export const fetchChannel5 = async () => {
  // 5번 채널: 질문 게시판
  try {
    const { data: channel } = await supabase
      .from('channel')
      .select('*')
      .eq('id', 5)
      .single();

    return channel;
  } catch (e) {
    console.error(e);
  }
};
