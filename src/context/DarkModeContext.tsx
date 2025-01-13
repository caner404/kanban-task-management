import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export function DarkModeProvider(props: PropsWithChildren) {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('isDarkMode');
    return storedTheme !== null ? storedTheme === 'true' : prefersDarkMode;
  });

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    [isDarkMode],
  );

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}
