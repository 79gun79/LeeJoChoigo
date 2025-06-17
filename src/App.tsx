import { useEffect } from 'react';
import Router from './routes';
import { useThemeStore } from './stores/themeStore';

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    const defaultDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    useThemeStore.getState().setTheme(defaultDark);
  }, []);
  return (
    <>
      <div>
        <Router />
      </div>
    </>
  );
}
