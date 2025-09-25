import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeIcons = {
    light: '☀️',
    dark: '🌙',
    system: '💻'
  };

  const themeLabels = {
    light: 'Light',
    dark: 'Dark',
    system: 'System'
  };

  const handleThemeSelect = (selectedTheme) => {
    changeTheme(selectedTheme);
    setIsOpen(false);
  };

  return (
    <div className="theme-toggle">
      <button
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
      >
        <span className="theme-icon">{themeIcons[theme]}</span>
        <span className="theme-label">{themeLabels[theme]}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((themeOption) => (
            <button
              key={themeOption}
              className={`theme-option ${theme === themeOption ? 'active' : ''}`}
              onClick={() => handleThemeSelect(themeOption)}
            >
              <span className="theme-option-icon">{themeIcons[themeOption]}</span>
              <span className="theme-option-label">{themeLabels[themeOption]}</span>
              {theme === themeOption && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div 
          className="theme-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
