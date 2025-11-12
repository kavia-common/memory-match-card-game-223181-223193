import React, { useEffect, useRef } from 'react';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * WinModal displays end-of-game stats and provides a play again button.
 */
export default function WinModal({ open, time, moves, onPlayAgain }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="You won the game"
      tabIndex={-1}
      ref={dialogRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17, 24, 39, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: theme.surface,
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: 16,
          boxShadow: '0 16px 40px rgba(0,0,0,0.16)',
          padding: 20,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryAccent} 100%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: 800,
            fontSize: 22,
            marginBottom: 6,
          }}
        >
          Congratulations!
        </div>
        <p style={{ marginTop: 0, color: theme.textMuted }}>
          You completed the Ocean Memory Match.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            margin: '16px 0',
          }}
        >
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: theme.headerPillBg,
              border: `1px solid ${theme.surfaceBorder}`,
            }}
          >
            <div style={{ fontSize: 12, color: theme.textMuted }}>Time</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{time}</div>
          </div>
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: theme.headerPillBg,
              border: `1px solid ${theme.surfaceBorder}`,
            }}
          >
            <div style={{ fontSize: 12, color: theme.textMuted }}>Moves</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{moves}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onPlayAgain}
          style={{
            display: 'inline-block',
            background: `linear-gradient(135deg, ${theme.success} 0%, rgba(16,185,129,0.85) 100%)`,
            color: '#fff',
            border: 'none',
            padding: '12px 16px',
            borderRadius: 12,
            fontWeight: 800,
            letterSpacing: 0.3,
            boxShadow: '0 10px 24px rgba(16,185,129,0.25)',
            cursor: 'pointer',
            transition: 'transform 120ms ease, box-shadow 200ms ease',
          }}
          aria-label="Play again"
        >
          ▶ Play again
        </button>
      </div>
    </div>
  );
}
