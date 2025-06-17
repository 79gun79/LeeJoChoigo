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
  resetProblems: () => void;
};

export const useProblemStore = create<PostStore>((set, get) => ({
  problems: [],
  sortType: 'latest',

  setSortType: (sortType) => set({ sortType }),

  setProblemsByPage: async (page: number, sortType: 'latest' | 'popular') => {
    const exists = get().problems.find((p) => p.page === page);
    if (exists) return;

    const data =
      sortType === 'latest'
        ? await fetchBjProblems(page, 'id', true)
        : await fetchBjProblems(page, 'like_count', false);

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
