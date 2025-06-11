import { create } from 'zustand';
import type { PostType } from '../types/post';
import { fetchBjProblems } from '../utils/fetchBjProblems';
import { immer } from 'zustand/middleware/immer';

type PostStore = {
  problems: { page: number; posts: PostType[] }[];
  setProblemsByPage: (page: number) => Promise<void>;
};

export const useProblemStore = create<PostStore>()(
  immer((set, get) => ({
    problems: [],
    setProblemsByPage: async (page: number) => {
      const exists = get().problems.find((p) => p.page === page);
      if (exists) return;

      const data = await fetchBjProblems(page);
      if (data && data.length > 0) {
        set((state) => {
          state.problems.push({ page, posts: data });
        });
      }
      console.log('저장완료 : ', get().problems.length);
    },
  })),
);
