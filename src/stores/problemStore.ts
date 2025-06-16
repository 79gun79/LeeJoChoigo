import { create } from 'zustand';
import { fetchBjProblems } from '../utils/fetchBjProblems';
import type { BJPostType } from '../types';

type PostStore = {
  problems: { page: number; posts: BJPostType[] }[];
  setProblemsByPage: (page: number) => Promise<void>;
};

export const useProblemStore = create<PostStore>((set, get) => ({
  problems: [],
  setProblemsByPage: async (page: number) => {
    const exists = get().problems.find((p) => p.page === page);
    if (exists) return;

    const data = await fetchBjProblems(page);
    if (data && data.length > 0) {
      set((state) => ({
        problems: [...state.problems, { page, posts: data }],
      }));
    }
    console.log('problem store : ', get().problems.length + '개');
  },
}));
