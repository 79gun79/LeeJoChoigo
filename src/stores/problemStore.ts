import { create } from 'zustand';
import { fetchBjProblems } from '../utils/fetchBjProblems';
import type { BJPostType } from '../types';

type PostStore = {
  problems: { page: number; posts: BJPostType[] }[];
  setProblemsByPage: (
    page: number,
    sortType: 'latest' | 'popular',
  ) => Promise<void>;
  updateProblemLike: (postId: number, newLikes: BJPostType['like']) => void;
  sortType: 'latest' | 'popular';
  setSortType: (sortType: 'latest' | 'popular') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchTags: string[];
  setSearchTags: (tags: string[]) => void;
  resetProblems: () => void;
};

export const useProblemStore = create<PostStore>((set, get) => ({
  problems: [],
  sortType: 'latest',
  searchQuery: '',
  searchTags: [],

  setSortType: (sortType) => set({ sortType }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSearchTags: (tags) => set({ searchTags: tags }),

  setProblemsByPage: async (page: number, sortType: 'latest' | 'popular') => {
    const qr = get().searchQuery;
    const tg = get().searchTags;
    const exists = get().problems.find((p) => p.page === page && qr === '');
    if (exists) return;

    const data =
      sortType === 'latest'
        ? await fetchBjProblems(page, 'id', true, qr, tg)
        : await fetchBjProblems(page, 'like_count', false, qr, tg);

    if (data && data.length > 0) {
      set((state) => ({
        problems: [...state.problems, { page, posts: data }],
      }));
    }
    console.log('problem store : ', get().problems.length + '개');
  },

  updateProblemLike: (postId, newLikes) => {
    set((state) => ({
      problems: state.problems.map((pageObj) => ({
        ...pageObj,
        posts: pageObj.posts.map((post) =>
          post.id === postId ? { ...post, like: newLikes } : post,
        ),
      })),
    }));
  },

  resetProblems: () => set({ problems: [] }),
}));
