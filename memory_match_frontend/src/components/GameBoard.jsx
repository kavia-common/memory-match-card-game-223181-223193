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
  const gridTemplateColumns = useMemo(() => `repeat(${cols}, minmax(0, 1fr))`, [cols]);
  const t = passedTheme || theme;

  return (
    <section
      aria-label={`Game board ${cols} by ${rows}${difficulty ? `, difficulty ${difficulty}` : ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap: 12,
        padding: 12,
        background: t.boardBg,
        borderRadius: 14,
        border: `1px solid ${t.surfaceBorder}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
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
