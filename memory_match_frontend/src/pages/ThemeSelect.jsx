import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import theme from '../styles/theme';
import { AppContext } from '../context/AppContext';
import { ThemeContext } from '../context/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * ThemeSelect page: shown after login to select card theme.
 * Options: Fish (default), Fruits, Flower.
 * Fruits and Flower mirror Fish layout/behavior/styles (only labels/assets differ).
 */
export default function ThemeSelect() {
  const { username } = useContext(AppContext);
  const { themeKey, setThemeKey } = useContext(ThemeContext);
  const [choice, setChoice] = useState(themeKey || 'fish');
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/login', { replace: true });
    }
  }, [username, navigate]);

  const onContinue = () => {
    setThemeKey(choice || 'fish');
    // After theme, go to mode selection
    navigate('/select');
  };

  const OptionCard = ({ value, title, subtitle, icon }) => {
    const selected = choice === value;
    return (
      <button
        type="button"
        onClick={() => setChoice(value)}
        aria-pressed={selected}
        aria-label={`${title} theme ${selected ? 'selected' : ''}`}
        style={{
          textAlign: 'left',
          width: '100%',
          background: selected ? '#FFFFFF' : theme.headerPillBg,
          border: `2px solid ${selected ? theme.primaryAccent : theme.surfaceBorder}`,
          borderRadius: 14,
          padding: 14,
          cursor: 'pointer',
          boxShadow: selected ? `0 10px 24px ${theme.primaryShadow}` : 'inset 0 1px 0 rgba(255,255,255,0.6)',
          transition: 'transform 120ms ease, box-shadow 200ms ease, opacity 120ms ease, border-color 150ms ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 34,
              height: 34,
              borderRadius: 999,
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryAccent} 100%)`,
              color: '#fff',
              fontWeight: 800,
            }}
            aria-hidden="true"
          >
            {icon}
          </span>
          <div>
            <div style={{ fontWeight: 800, color: theme.text }}>{title}</div>
            <div style={{ color: theme.textMuted, fontSize: 13 }}>{subtitle}</div>
          </div>
        </div>
      </button>
    );
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
        aria-label="Select theme"
        style={{
          width: '100%',
          maxWidth: 720,
          background: theme.surface,
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          padding: 22,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>Choose your theme</h1>
          <div style={{ color: theme.textMuted, fontSize: 14 }}>
            Player: <strong style={{ color: theme.text }}>{username}</strong>
          </div>
        </div>
        <p style={{ marginTop: 8, color: theme.textMuted }}>
          Select how your cards should look. You can change difficulty later. If you skip, we’ll use Fish by default.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 12 }}>
          <OptionCard value="fish" title="Fish" subtitle="Ocean friends and seashells" icon="🐟" />
          <OptionCard value="fruits" title="Fruits" subtitle="Juicy and fresh picks" icon="🍓" />
          <OptionCard value="flower" title="Flower" subtitle="Blooming and bright" icon="🌸" />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button
            type="button"
            onClick={onContinue}
            className="btn-primary"
            aria-label="Continue to mode selection"
            style={{
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
            }}
          >
            Continue
          </button>
          <Link to="/login" style={{ alignSelf: 'center', color: theme.textMuted, textDecoration: 'underline' }}>
            Change username
          </Link>
        </div>
      </main>
    </div>
  );
}
