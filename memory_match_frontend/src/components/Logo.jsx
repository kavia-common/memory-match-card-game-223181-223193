import React from 'react';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * Logo renders the app brand mark to be used at the top of auth/forms.
 * If no image asset is present, it shows a clean text+emoji wordmark.
 */
export default function Logo({ size = 'md', align = 'center' }) {
  const sizes = {
    sm: { icon: 28, title: 18, subtitle: 11, gap: 8, pad: 8 },
    md: { icon: 36, title: 20, subtitle: 12, gap: 10, pad: 10 },
    lg: { icon: 44, title: 22, subtitle: 13, gap: 12, pad: 12 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div
      aria-label="Memory Match logo"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: align === 'left' ? 'flex-start' : 'center',
        gap: s.gap,
        padding: s.pad,
        background: '#fff',
        borderRadius: 12,
        border: `1px solid ${theme.surfaceBorder}`,
        boxShadow: `0 8px 24px ${theme.primaryShadow}`,
        width: 'auto',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: s.icon,
          height: s.icon,
          borderRadius: 10,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryAccent} 100%)`,
          color: '#fff',
          fontSize: Math.max(14, Math.floor(s.icon * 0.6)),
          fontWeight: 900,
          boxShadow: `0 6px 14px ${theme.primaryShadow}`,
        }}
      >
        🧠
      </div>
      <div style={{ lineHeight: 1.1 }}>
        <div
          style={{
            fontWeight: 900,
            fontSize: s.title,
            letterSpacing: 0.3,
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryAccent} 100%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Memory Match
        </div>
        <div style={{ fontSize: s.subtitle, color: theme.textMuted }}>
          Ocean Edition
        </div>
      </div>
    </div>
  );
}
