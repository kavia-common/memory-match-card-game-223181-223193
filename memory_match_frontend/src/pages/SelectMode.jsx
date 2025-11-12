import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * SelectMode page: lets a logged-in user pick a game difficulty (4x4 or 6x6).
 * Navigates to /game after selection.
 */
export default function SelectMode() {
  const { username, difficulty, setDifficulty } = useContext(AppContext);
  const navigate = useNavigate();
  const [choice, setChoice] = useState(difficulty || '4x4');

  useEffect(() => {
    if (!username) {
      navigate('/login', { replace: true });
    }
  }, [username, navigate]);

  const onContinue = () => {
    setDifficulty(choice);
    navigate('/game');
  };

  const ModeCard = ({ label, description }) => {
    const selected = choice === label;
    return (
      <button
        type="button"
        onClick={() => setChoice(label)}
        aria-pressed={selected}
        aria-label={`${label} mode ${selected ? 'selected' : ''}`}
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
            {label === '4x4' ? 'E' : 'H'}
          </span>
          <div>
            <div style={{ fontWeight: 800, color: theme.text }}>{label}</div>
            <div style={{ color: theme.textMuted, fontSize: 13 }}>{description}</div>
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
        aria-label="Select game mode"
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
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>Choose your mode</h1>
          <div style={{ color: theme.textMuted, fontSize: 14 }}>Player: <strong style={{ color: theme.text }}>{username}</strong></div>
        </div>
        <p style={{ marginTop: 8, color: theme.textMuted }}>
          Select a board size. 4x4 is friendly; 6x6 is challenging.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
          <ModeCard label="4x4" description="8 pairs, great warm-up" />
          <ModeCard label="6x6" description="18 pairs, serious challenge" />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button
            type="button"
            onClick={onContinue}
            className="btn-primary"
            aria-label="Continue to game"
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
