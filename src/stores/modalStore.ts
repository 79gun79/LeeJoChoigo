import { create } from 'zustand';

interface ModalState {
  isLogInOpen: boolean;
  isLogOutOpen: boolean;

  setLogInModal: (isOpen: boolean) => void;
  setLogOutModal: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLogInOpen: false,
  isLogOutOpen: false,

  setLogInModal: (isOpen) => set({ isLogInOpen: isOpen }),
  setLogOutModal: (isOpen) => set({ isLogOutOpen: isOpen }),
}));
