import React, { useMemo } from 'react';
import Card from './Card';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * GameBoard renders a responsive grid of memory cards.
 * @param {object} props
 * @param {number} props.cols
 * @param {number} props.rows
 * @param {Array} props.cards
 * @param {(id:string)=>void} props.onFlip
 * @param {object} [props.theme]
 * @param {string} [props.difficulty]
 */
export default function GameBoard({ cols, rows, cards, onFlip, theme: passedTheme, difficulty }) {
  const t = passedTheme || theme;

  // Equal-width columns; card size is driven by CSS variables
  const gridTemplateColumns = useMemo(() => `repeat(${cols}, minmax(0, 1fr))`, [cols]);

  // PUBLIC_INTERFACE
  // Card size is defined globally via CSS variables; only expose grid gap/padding variables here.
  const boardVars = useMemo(() => {
    return {
      // Card sizing is global; do not override here.
      '--grid-gap': 'var(--grid-gap, 10px)',
      '--board-padding': 'var(--board-padding, 12px)',
    };
  }, []);

  // Reduced motion detection
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Difficulty class to enable CSS-based overrides
  const difficultyClass =
    difficulty === '6x6'
      ? 'board--hard'
      : difficulty === '4x4'
      ? 'board--easy'
      : '';

  return (
    <section
      aria-label={`Game board ${cols} by ${rows}${difficulty ? `, difficulty ${difficulty}` : ''}`}
      className={difficultyClass}
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap: 'var(--grid-gap)',
        padding: 'var(--board-padding)',
        background: t.boardBg,
        borderRadius: 14,
        border: `1px solid ${t.surfaceBorder}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
        // Ensure outlines are not clipped by adding minimal extra space if custom focus ring grows
        // Note: main padding is already generous; additional safe-area can be added via CSS vars if needed.
        ...boardVars,
      }}
    >
      {cards.map((card, idx) => {
        const delay = prefersReducedMotion ? '0ms' : `${Math.min(idx * 30, 240)}ms`;
        const entranceClass = 'cardEntrance';
        // Note: The entranceClass only animates opacity in CSS to avoid breaking 3D perspective.
        // Do not apply transforms on this wrapper, as it sits above the perspective context (.cardButton).
        return (
          <div
            key={card.id}
            style={{ animationDelay: delay }}
            className={entranceClass}
          >
            <Card
              card={card}
              onFlip={() => onFlip(card.id)}
              theme={t}
            />
          </div>
        );
      })}
    </section>
  );
}
