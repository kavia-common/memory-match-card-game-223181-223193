import React from 'react';
import theme from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * StatusBar shows title, timer and move counter, a difficulty selector, Theme switcher, and a Restart button.
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.time
 * @param {number} props.moves
 * @param {() => void} props.onRestart
 * @param {string} [props.difficulty] - Current difficulty label, e.g., '4x4' or '6x6'
 * @param {(next:string)=>void} [props.onChangeDifficulty] - Change difficulty handler
 * @param {string[]} [props.difficulties] - Allowed difficulty options
 * @param {string} [props.themeKey] - Current theme key: 'fish' | 'fruits' | 'flower'
 * @param {(next:string)=>void} [props.onChangeTheme] - Handler to change theme key
 */
export default function StatusBar({
  title,
  time,
  moves,
  onRestart,
  difficulty,
  onChangeDifficulty,
  difficulties = ['4x4', '6x6'],
  themeKey,
  onChangeTheme,
}) {
  const canChangeDifficulty = typeof onChangeDifficulty === 'function';
  const canChangeTheme = typeof onChangeTheme === 'function';

  // Small compact pill for theme switcher matching Ocean Professional style
  const themeOptions = [
    { key: 'fish', label: 'Fish', icon: '🐟' },
    { key: 'fruits', label: 'Fruits', icon: '🍓' },
    { key: 'flower', label: 'Flower', icon: '🌸' },
  ];

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
          aria-label={`Memory Match${difficulty ? `, difficulty ${difficulty}` : ''}`}
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
          gap: 12,
          justifyContent: 'center',
          background: theme.headerPillBg,
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: 999,
          padding: '8px 14px',
          flexWrap: 'wrap',
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
        <span
          style={{
            width: 1,
            height: 20,
            background: theme.surfaceBorder,
          }}
          aria-hidden="true"
        />

        {/* Compact Theme Switcher */}
        <div
          role="group"
          aria-label={`Theme selection, current ${(themeKey || 'fish')}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#fff',
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: 999,
            padding: '4px 6px',
          }}
        >
          <span
            style={{ fontSize: 12, color: theme.textMuted, paddingLeft: 4 }}
            aria-hidden="true"
          >
            Theme
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {themeOptions.map((opt) => {
              const selected = (themeKey || 'fish') === opt.key;
              return (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => canChangeTheme && onChangeTheme(opt.key)}
                  aria-pressed={selected}
                  aria-label={`${opt.label} theme${selected ? ' selected' : ''}`}
                  disabled={!canChangeTheme}
                  style={{
                    background: selected
                      ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryAccent} 100%)`
                      : 'transparent',
                    color: selected ? '#fff' : theme.text,
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: 999,
                    fontWeight: 700,
                    cursor: canChangeTheme ? 'pointer' : 'default',
                    boxShadow: selected ? `0 6px 18px ${theme.primaryShadow}` : 'none',
                    transition: 'all 120ms ease',
                    minWidth: 44,
                  }}
                >
                  <span aria-hidden="true" style={{ marginRight: 4 }}>
                    {opt.icon}
                  </span>
                  <span style={{ fontSize: 12 }}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

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
          onChange={(e) => canChangeDifficulty && onChangeDifficulty(e.target.value)}
          disabled={!canChangeDifficulty}
          style={{
            appearance: 'none',
            background: '#fff',
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: 10,
            padding: '6px 10px',
            color: theme.text,
            fontWeight: 600,
            cursor: canChangeDifficulty ? 'pointer' : 'default',
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
