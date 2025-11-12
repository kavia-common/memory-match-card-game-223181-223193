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

  // Grid gap tuning: smaller for dense grids (6x6), slightly larger for 4x4 for readability
  const gap = useMemo(() => {
    if (cols >= 6 || rows >= 6) return 6; // denser grid -> tighter gaps but still readable
    return 12; // roomier on 4x4
  }, [cols, rows]);

  // Equal-width columns; card size is driven by CSS variables
  const gridTemplateColumns = useMemo(() => `repeat(${cols}, minmax(0, 1fr))`, [cols]);

  // Override card size variable for 6x6 boards to use the smaller token
  const cardSizeVar = useMemo(() => {
    const isDense = cols >= 6 || rows >= 6;
    // Expose both new and legacy variables for compatibility
    return isDense
      ? {
          '--card-size': 'var(--card-size-sm)',
          '--mm-card-size': 'var(--card-size-sm)',
        }
      : {
          '--card-size': 'var(--card-size)',
          '--mm-card-size': 'var(--card-size)',
        };
  }, [cols, rows]);

  return (
    <section
      aria-label={`Game board ${cols} by ${rows}${difficulty ? `, difficulty ${difficulty}` : ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap,
        padding: 10,
        background: t.boardBg,
        borderRadius: 14,
        border: `1px solid ${t.surfaceBorder}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
        ...cardSizeVar,
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onFlip={() => onFlip(card.id)}
          theme={t}
        />
      ))}
    </section>
  );
}
