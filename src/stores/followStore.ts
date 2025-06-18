// stores/followStore.ts
import { create } from 'zustand';

type FollowState = {
  followMap: Record<string, boolean>; // userId => isFollowing
  setFollow: (userId: string, value: boolean) => void;
};

export const useFollowStore = create<FollowState>((set) => ({
  followMap: {},
  setFollow: (userId, value) =>
    set((state) => ({
      followMap: { ...state.followMap, [userId]: value },
    })),
}));
