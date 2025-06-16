import { create } from 'zustand';
import { fetchBjProblems } from '../utils/fetchBjProblems';
import type { BJPostType } from '../types';

type PostStore = {
  problems: { page: number; posts: BJPostType[] }[];
  setProblemsByPage: (page: number) => Promise<void>;
  updateProblemLike: (postId: number, newLikes: BJPostType['like']) => void;
  sortType: 'latest' | 'popular';
  setSortType: (sortType: 'latest' | 'popular') => void;
};

export const useProblemStore = create<PostStore>((set, get) => ({
  problems: [],
  sortType: 'latest',

  setSortType: (sortType) => {
    set((state) => ({
      sortType: sortType,
      problems: state.problems.map((pageObj) => ({
        ...pageObj,
        posts: [...pageObj.posts].sort((a, b) =>
          sortType === 'popular' ? b.like.length - a.like.length : a.id - b.id,
        ),
      })),
    }));
  },

  setProblemsByPage: async (page: number) => {
    const exists = get().problems.find((p) => p.page === page);
    if (exists) return;

    const data = await fetchBjProblems(page);
    if (data && data.length > 0) {
      const { sortType } = get();
      const sortedData =
        sortType === 'popular'
          ? [...data].sort((a, b) => b.like.length - a.like.length)
          : [...data].sort((a, b) => a.id - b.id);

      set((state) => ({
        problems: [...state.problems, { page, posts: sortedData }],
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
}));
