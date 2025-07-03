import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appearance } from 'react-native';

export type AccentColor = 'orange' | 'blue' | 'red' | 'purple';

interface ThemeContextProps {
  isDark: boolean;
  toggleTheme: () => void;
  accent: AccentColor;
  setAccent: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const [accent, setAccent] = useState<AccentColor>('orange');

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}; 