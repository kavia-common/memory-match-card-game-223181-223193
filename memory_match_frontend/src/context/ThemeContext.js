import React, { createContext, useCallback, useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * ThemeContext stores the selected game theme across the session.
 * Supported themes: 'fish' (default), 'fruits', 'flower'
 */
export const ThemeContext = createContext({
  themeKey: 'fish',
  setThemeKey: (_key) => {},
});

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  // Session-persisted only (do not write to localStorage per requirement)
  const [themeKey, setThemeKeyState] = useState('fish');

  const setThemeKey = useCallback((key) => {
    const normalized = String(key || 'fish').toLowerCase();
    if (normalized === 'fish' || normalized === 'fruits' || normalized === 'flower') {
      setThemeKeyState(normalized);
    } else {
      setThemeKeyState('fish');
    }
  }, []);

  const value = useMemo(() => ({ themeKey, setThemeKey }), [themeKey, setThemeKey]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
