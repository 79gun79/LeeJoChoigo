// src/components/atoms/DarkToggle.tsx
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

export default function DarkToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-gray1 flex items-center justify-center rounded-full p-1 transition-colors dark:hover:bg-gray-700"
      aria-label="다크모드 토글"
    >
      <span
        className={`inline-block transition-transform duration-300 ${
          isDark ? 'rotate-90' : ''
        }`}
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-400 transition-colors duration-300 md:h-6 md:w-6" />
        ) : (
          <Moon className="h-5 w-5 text-black transition-colors duration-300 md:h-6 md:w-6" />
        )}
      </span>
    </button>
  );
}
