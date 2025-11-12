import React, { useMemo } from 'react';
import styles from './Card.module.css';

/**
 * PUBLIC_INTERFACE
 * Card component represents a single memory card with accessible button.
 */
export default function Card({ card, onFlip, theme }) {
  const stateLabel = useMemo(() => {
    if (card.isMatched) return 'matched';
    if (card.isFlipped) return 'revealed';
    return 'hidden';
  }, [card.isMatched, card.isFlipped]);

  const handleKey = (e) => {
    const isSpace = e.key === ' ' || e.key === 'Spacebar';
    if (e.key === 'Enter' || isSpace) {
      e.preventDefault();
      if (!card.isMatched) onFlip();
    }
  };

  const disabled = card.isMatched;

  return (
    <button
      type="button"
      className={styles.cardButton}
      onClick={!disabled ? onFlip : undefined}
      onKeyDown={handleKey}
      aria-label={`Card ${stateLabel}`}
      aria-pressed={card.isFlipped || card.isMatched}
      disabled={disabled}
      style={{
        '--card-surface': theme.surface,
        '--card-front': theme.cardFront,
        '--card-back': theme.cardBack,
        '--card-border': theme.surfaceBorder,
        '--card-shadow': theme.cardShadow,
        '--card-text': theme.text,
      }}
    >
      <div
        className={`${styles.card} ${
          card.isMatched ? styles.matched : card.isFlipped ? styles.flipped : ''
        }`}
        aria-hidden="true"
      >
        <div className={styles.cardFace + ' ' + styles.cardFront}>
          <span className={styles.faceText}>{card.face}</span>
        </div>
        <div className={styles.cardFace + ' ' + styles.cardBack}>
          <span className={styles.backAccent}>◆</span>
        </div>
      </div>
    </button>
  );
}
