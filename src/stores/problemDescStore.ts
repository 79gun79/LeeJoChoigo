import { create } from 'zustand';

type DescType = {
  problemDesc: Record<string, string>;
  setProblemDesc: (id: string, desc: string) => void;
};

export const useProblemDescStore = create<DescType>((set) => ({
  problemDesc: {},
  setProblemDesc: (id, desc) =>
    set((state) => ({
      problemDesc: {
        ...state.problemDesc,
        [id]: desc,
      },
    })),
}));
