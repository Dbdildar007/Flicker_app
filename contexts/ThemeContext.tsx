import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

export interface Colors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryDark: string;
  accent: string;
  border: string;
  error: string;
  success: string;
  overlay: string;
  gradient1: string;
  gradient2: string;
}

interface ThemeContextType {
  theme: Theme;
  colors: Colors;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
}

const lightColors: Colors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  primary: '#E50914',
  primaryDark: '#B20710',
  accent: '#00A8E1',
  border: '#E0E0E0',
  error: '#FF3B30',
  success: '#34C759',
  overlay: 'rgba(0, 0, 0, 0.5)',
  gradient1: '#E50914',
  gradient2: '#831010',
};

const darkColors: Colors = {
  background: '#000000',
  surface: '#141414',
  card: '#1C1C1C',
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  primary: '#E50914',
  primaryDark: '#B20710',
  accent: '#00A8E1',
  border: '#2C2C2C',
  error: '#FF453A',
  success: '#32D74B',
  overlay: 'rgba(0, 0, 0, 0.7)',
  gradient1: '#E50914',
  gradient2: '#831010',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  colors: darkColors,
  isDark: true,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setThemeState(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const isDark =
    theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
