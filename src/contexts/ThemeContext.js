import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [actualTheme, setActualTheme] = useState('dark');

  // Get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default to dark theme
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  // Update actual theme based on theme setting
  useEffect(() => {
    let newActualTheme;
    
    if (theme === 'system') {
      newActualTheme = getSystemTheme();
    } else {
      newActualTheme = theme;
    }
    
    setActualTheme(newActualTheme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newActualTheme);
    document.documentElement.className = newActualTheme;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        setActualTheme(newSystemTheme);
        document.documentElement.setAttribute('data-theme', newSystemTheme);
        document.documentElement.className = newSystemTheme;
      };

      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      changeTheme('dark');
    } else if (theme === 'dark') {
      changeTheme('system');
    } else {
      changeTheme('light');
    }
  };

  const value = {
    theme,
    actualTheme,
    changeTheme,
    toggleTheme,
    themes: ['light', 'dark', 'system']
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
