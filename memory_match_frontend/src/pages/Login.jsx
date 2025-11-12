import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * Login page: collects a username with validation and stores it in context/localStorage.
 * On success, navigates to /select.
 */
export default function Login() {
  const { username, setUsername } = useContext(AppContext);
  const [value, setValue] = useState(username || '');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const validate = (name) => {
    const trimmed = (name || '').trim();
    if (!trimmed) return 'Please enter a username.';
    if (trimmed.length < 2) return 'Username must be at least 2 characters.';
    if (trimmed.length > 20) return 'Username must be 20 characters or fewer.';
    if (!/^[a-zA-Z0-9 _.-]+$/.test(trimmed)) return 'Use letters, numbers, space, dot, dash or underscore.';
    return '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = validate(value);
    if (v) {
      setError(v);
      return;
    }
    setError('');
    setUsername(value.trim());
    // After login, go to theme selection
    navigate('/theme');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.gradientEndBg} 100%)`,
        color: theme.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <main
        role="main"
        aria-label="Login to Memory Match"
        style={{
          width: '100%',
          maxWidth: 520,
          background: theme.surface,
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          padding: 22,
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 8, fontSize: 26, fontWeight: 800, color: theme.text }}>
          Memory Match
        </h1>
        <p style={{ marginTop: 0, color: theme.textMuted }}>Test your memory. Let’s start by choosing a username.</p>
        <form onSubmit={onSubmit} noValidate>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="username" style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: theme.text }}>
              Username
            </label>
            <input
              id="username"
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'username-error' : undefined}
              placeholder="e.g., Alex"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 12,
                border: `1px solid ${theme.surfaceBorder}`,
                outline: 'none',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
                fontSize: 16,
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // allow submit naturally
                }
              }}
            />
            {error ? (
              <div id="username-error" role="alert" style={{ color: theme.error, marginTop: 6, fontSize: 13 }}>
                {error}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn-primary"
            aria-label="Continue to game selection"
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryAccent} 100%)`,
              color: '#fff',
              border: 'none',
              padding: '12px 16px',
              borderRadius: 12,
              fontWeight: 800,
              letterSpacing: 0.3,
              boxShadow: `0 10px 24px ${theme.primaryShadow}`,
              cursor: 'pointer',
              transition: 'transform 120ms ease, box-shadow 200ms ease, opacity 120ms ease',
              marginTop: 8,
            }}
          >
            Continue
          </button>
        </form>
        <div style={{ marginTop: 14, fontSize: 13, color: theme.textMuted }}>
          Quick links: <Link to="/theme">Theme</Link> · <Link to="/select">Game modes</Link>
        </div>
      </main>
    </div>
  );
}
