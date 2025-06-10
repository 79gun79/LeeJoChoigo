import supabase from '../utils/supabase';

export const fetchChannel1 = async () => {
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
