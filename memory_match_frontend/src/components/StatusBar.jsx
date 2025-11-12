import React from 'react';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * StatusBar shows title, timer and move counter, and a Restart button.
 */
export default function StatusBar({ title, time, moves, onRestart }) {
  return (
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
      }}
    >
      <div style={{ textAlign: 'left' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            color: theme.text,
            fontWeight: 700,
            letterSpacing: 0.2,
          }}
          aria-label={`${title}`}
        >
          {title}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: theme.textMuted,
          }}
        >
          Find all matching pairs
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          justifyContent: 'center',
          background: theme.headerPillBg,
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: 999,
          padding: '8px 14px',
        }}
        aria-label="Game status"
      >
        <span
          style={{
            fontVariantNumeric: 'tabular-nums',
            color: theme.text,
            fontWeight: 600,
          }}
          aria-label={`Time elapsed ${time}`}
        >
          ⏱ {time}
        </span>
        <span
          style={{
            width: 1,
            height: 20,
            background: theme.surfaceBorder,
          }}
          aria-hidden="true"
        />
        <span
          style={{ color: theme.text, fontWeight: 600 }}
          aria-label={`Moves ${moves}`}
        >
          🎯 {moves} moves
        </span>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          type="button"
          onClick={onRestart}
          className="btn-restart"
          style={{
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryAccent} 100%)`,
            color: '#fff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: 12,
            fontWeight: 700,
            letterSpacing: 0.3,
            boxShadow: `0 6px 18px ${theme.primaryShadow}`,
            cursor: 'pointer',
            transition: 'transform 120ms ease, box-shadow 200ms ease, opacity 120ms ease',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onRestart();
            }
          }}
          aria-label="Restart game"
        >
          ↻ Restart
        </button>
      </div>
    </header>
  );
}
