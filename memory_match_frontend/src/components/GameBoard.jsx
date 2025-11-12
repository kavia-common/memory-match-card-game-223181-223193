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

  // Grid sizing: smaller gaps for 6x6 to keep board compact; slightly larger for 4x4
  const gap = useMemo(() => {
    if (cols >= 6 || rows >= 6) return 8;
    return 10;
  }, [cols, rows]);

  // Use equal columns; card size itself is driven by CSS variable in Card.module.css
  const gridTemplateColumns = useMemo(() => `repeat(${cols}, minmax(0, 1fr))`, [cols]);

  // Board max width tuned so cards remain smaller while maintaining responsive growth
  const maxWidth = useMemo(() => {
    // heuristic: card size var ~ 84-96px max; include gaps
    const approximateCard = 96; // aligns with --mm-card-size max on larger screens
    return Math.min(1100, cols * approximateCard + (cols - 1) * gap + 24);
  }, [cols, gap]);

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
        // Provide a comfortable container width target while remaining responsive
        // This helps keep smaller cards consistent in size as the grid scales.
        '--mm-card-size': 'var(--mm-card-size)',
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
