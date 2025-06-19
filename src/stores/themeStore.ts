import { create } from 'zustand';

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () => {
    set((state) => {
      const newTheme = !state.isDark;
      document.documentElement.classList.toggle('dark', newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return { isDark: newTheme };
    });
  },
  setTheme: (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    set({ isDark });
  },
}));
