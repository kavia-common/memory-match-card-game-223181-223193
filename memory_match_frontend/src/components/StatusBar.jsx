import React from 'react';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * StatusBar shows title, timer and move counter, a difficulty selector, and a Restart button.
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.time
 * @param {number} props.moves
 * @param {() => void} props.onRestart
 * @param {string} [props.difficulty] - Current difficulty label, e.g., '4x4' or '6x6'
 * @param {(next:string)=>void} [props.onChangeDifficulty] - Change difficulty handler
 * @param {string[]} [props.difficulties] - Allowed difficulty options
 */
export default function StatusBar({
  title,
  time,
  moves,
  onRestart,
  difficulty,
  onChangeDifficulty,
  difficulties = ['4x4', '6x6'],
}) {
  const canChange = typeof onChangeDifficulty === 'function';

  return (
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 12,
        marginBottom: 18,
      }}
    >
      <div style={{ textAlign: 'left' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            color: theme.text,
            fontWeight: 800,
            letterSpacing: 0.2,
          }}
          aria-label={`${title}${difficulty ? `, difficulty ${difficulty}` : ''}`}
        >
          {title}
        </h1>
        <p
          style={{
            margin: '2px 0 0 0',
            fontSize: 13,
            color: theme.textMuted,
          }}
        >
          Find all matching pairs
        </p>
      </div>

      <div
        className="status-gradient"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          justifyContent: 'center',
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: 14,
          padding: '8px 14px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
        }}
        aria-label="Game status"
      >
        <span
          style={{
            fontVariantNumeric: 'tabular-nums',
            color: theme.text,
            fontWeight: 700,
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
          style={{ color: theme.text, fontWeight: 700 }}
          aria-label={`Moves ${moves}`}
        >
          🎯 {moves} moves
        </span>
        <span
          style={{
            width: 1,
            height: 20,
            background: theme.surfaceBorder,
          }}
          aria-hidden="true"
        />
        <label
          htmlFor="difficulty-select"
          style={{ fontSize: 12, color: theme.textMuted }}
        >
          Difficulty
        </label>
        <select
          id="difficulty-select"
          aria-label={`Select difficulty, current ${difficulty || ''}`}
          value={difficulty}
          onChange={(e) => canChange && onChangeDifficulty(e.target.value)}
          disabled={!canChange}
          style={{
            appearance: 'none',
            background: '#fff',
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: 10,
            padding: '6px 10px',
            color: theme.text,
            fontWeight: 700,
            cursor: canChange ? 'pointer' : 'default',
            transition: 'box-shadow var(--dur-fast) var(--easing-soft)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow =
              '0 0 0 2px #fff, 0 0 0 5px rgba(244,114,182,0.6)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {difficulties.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
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
            fontWeight: 800,
            letterSpacing: 0.3,
            boxShadow: `0 6px 18px ${theme.primaryShadow}`,
            cursor: 'pointer',
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
