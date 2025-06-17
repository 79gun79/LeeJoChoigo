// src/components/atoms/DarkToggle.tsx
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

export default function DarkToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-gray1 rounded-full p-1 transition-colors dark:hover:bg-gray-700"
      aria-label="다크모드 토글"
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 text-black" />
      )}
    </button>
  );
}
