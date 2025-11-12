import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * AppContext provides global state for username and difficulty selection.
 * Persists values to localStorage and exposes helpers to update and clear them.
 */
export const AppContext = createContext({
  username: '',
  setUsername: (_name) => {},
  difficulty: '4x4',
  setDifficulty: (_d) => {},
  clearSession: () => {},
});

const USERNAME_KEY = 'mm_username';
const DIFFICULTY_KEY = 'mm_difficulty';

// PUBLIC_INTERFACE
export function AppProvider({ children }) {
  /** Load from storage on first render */
  const [username, setUsernameState] = useState(() => {
    try {
      return localStorage.getItem(USERNAME_KEY) || '';
    } catch {
      return '';
    }
  });

  const [difficulty, setDifficultyState] = useState(() => {
    try {
      return localStorage.getItem(DIFFICULTY_KEY) || '4x4';
    } catch {
      return '4x4';
    }
  });

  useEffect(() => {
    try {
      if (username) localStorage.setItem(USERNAME_KEY, username);
      else localStorage.removeItem(USERNAME_KEY);
    } catch {
      /* ignore */
    }
  }, [username]);

  useEffect(() => {
    try {
      if (difficulty) localStorage.setItem(DIFFICULTY_KEY, difficulty);
    } catch {
      /* ignore */
    }
  }, [difficulty]);

  const setUsername = useCallback((name) => {
    setUsernameState(String(name || '').trim());
  }, []);

  const setDifficulty = useCallback((d) => {
    setDifficultyState(d);
  }, []);

  const clearSession = useCallback(() => {
    setUsernameState('');
    try {
      localStorage.removeItem(USERNAME_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ username, setUsername, difficulty, setDifficulty, clearSession }),
    [username, setUsername, difficulty, setDifficulty, clearSession]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
