import supabase from '../utils/supabase';

const excludeMarkdown = (query: string): string => {
  return query
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[.*?\]\([^)]+\)/g, '')
    .replace(/\[.*?\]\([^)]+\)/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~`]+/g, '')
    .replace(/^>\s*/gm, '')
    .replace(/^\s*[-+*]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\|.*?\|$/gm, '')
    .trim();
};

export const searchPosts = async (query: string, channelId: number) => {
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
      .eq('channel', channelId);

    if (!posts) return [];
    const q = query.trim().toLowerCase();

    return posts.filter((post) => {
      const title = post.title?.toLowerCase() ?? '';
      const content = post.content?.toLowerCase() ?? '';
      const cleanContent = excludeMarkdown(content);
      return title.includes(q) || cleanContent.includes(q);
    });
  } catch (e) {
    console.error(e);
  }
};
