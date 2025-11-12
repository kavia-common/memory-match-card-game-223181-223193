import React, { useEffect, useRef } from 'react';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * WinModal displays end-of-game stats and provides a play again button.
 * @param {object} props
 * @param {boolean} props.open
 * @param {string} props.time
 * @param {number} props.moves
 * @param {() => void} props.onPlayAgain
 * @param {string} [props.difficulty] - Difficulty used for the completed game.
 */
export default function WinModal({ open, time, moves, onPlayAgain, difficulty }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        // Let parent control closing via onPlayAgain as "dismiss"
        onPlayAgain?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onPlayAgain]);

  if (!open) return null;

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const containerStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(17, 24, 39, 0.45)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 1000,
    opacity: 1,
    animation: prefersReducedMotion ? 'none' : `fadeIn var(--dur-med) var(--easing-soft) both`,
  };

  const panelStyle = {
    width: '100%',
    maxWidth: 420,
    background: theme.surface,
    border: `1px solid ${theme.surfaceBorder}`,
    borderRadius: 16,
    boxShadow: '0 16px 40px rgba(0,0,0,0.16)',
    padding: 20,
    textAlign: 'center',
    transform: 'scale(1)',
    animation: prefersReducedMotion ? 'none' : `popIn var(--dur-med) var(--easing-snap) both`,
  };

  const sparkleStyle = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background:
      'radial-gradient(6px 6px at 20% 30%, rgba(244,114,182,0.35), transparent 60%), ' +
      'radial-gradient(5px 5px at 70% 60%, rgba(232,121,249,0.3), transparent 60%), ' +
      'radial-gradient(4px 4px at 40% 80%, rgba(16,185,129,0.25), transparent 60%)',
    opacity: 0,
    animation: prefersReducedMotion ? 'none' : `sparkle var(--dur-slow) var(--easing-soft) 0.2s 2`,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`You won the game${difficulty ? ` on ${difficulty} difficulty` : ''}`}
      tabIndex={-1}
      ref={dialogRef}
      style={containerStyle}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.96) }
          to { opacity: 1; transform: scale(1) }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0.98) }
          50% { opacity: 1; transform: scale(1) }
          100% { opacity: 0; transform: scale(1.02) }
        }
      `}</style>
      <div style={{ position: 'relative' }}>
        {!prefersReducedMotion && <div aria-hidden="true" style={sparkleStyle} />}
        <div style={panelStyle}>
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
            You completed the Ocean Memory Match{difficulty ? ` on ${difficulty}` : ''}.
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
              <div style={{ fontSize: 18, fontWeight: 800 }}>{time}</div>
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
              <div style={{ fontSize: 18, fontWeight: 800 }}>{moves}</div>
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
              transition: 'transform var(--dur-fast) var(--easing-soft), box-shadow var(--dur-med) var(--easing-soft)',
            }}
            className="btn-restart"
            aria-label="Play again"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPlayAgain();
              }
            }}
          >
            ▶ Play again
          </button>
        </div>
      </div>
    </div>
  );
}
