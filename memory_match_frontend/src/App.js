import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import './App.css';
import StatusBar from './components/StatusBar';
import GameBoard from './components/GameBoard';
import WinModal from './components/WinModal';
import { createDeck } from './utils/deck';
import { shuffle } from './utils/shuffle';
import { formatTime } from './utils/formatTime';
import useTimer from './hooks/useTimer';
import theme from './styles/theme';

/**
 * Root App rendering Memory Match Game with difficulty selection (4x4, 6x6).
 * Provides header, responsive game grid, controls, and win modal.
 * Uses environment variables only for non-critical toggles; no external API calls.
 */

// PUBLIC_INTERFACE
function App() {
  /** Minimal dev logs controlled via env */
  const isDev =
    (process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV) !== 'production';

  // Difficulty: '4x4' | '6x6' (persisted)
  const DIFFICULTIES = {
    EASY: '4x4',
    HARD: '6x6',
  };
  const [difficulty, setDifficulty] = useState(() => {
    try {
      return localStorage.getItem('mm_difficulty') || DIFFICULTIES.EASY;
    } catch {
      return DIFFICULTIES.EASY;
    }
  });

  // Grid size derived from difficulty
  const { cols, rows, pairCount } = useMemo(() => {
    if (difficulty === DIFFICULTIES.HARD) {
      return { cols: 6, rows: 6, pairCount: 18 };
    }
    // default EASY
    return { cols: 4, rows: 4, pairCount: 8 };
  }, [difficulty]);

  // Persist difficulty
  useEffect(() => {
    try {
      localStorage.setItem('mm_difficulty', difficulty);
    } catch {
      // ignore storage errors
    }
  }, [difficulty]);

  // Seed for deterministic shuffles when needed (e.g., tests)
  const [seed, setSeed] = useState(null);

  // Create deck based on pair count; memoized with seed for determinism
  const initialDeck = useMemo(() => {
    const baseDeck = createDeck(pairCount);
    return shuffle(baseDeck, seed ?? undefined);
  }, [pairCount, seed]);

  const [cards, setCards] = useState(initialDeck);
  const [flippedIds, setFlippedIds] = useState([]); // currently flipped (max 2)
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);
  const [firstFlipDone, setFirstFlipDone] = useState(false);
  const liveRegionRef = useRef(null);

  const {
    seconds,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
    running,
  } = useTimer();

  // Reset deck and core counters when deck source changes (pairCount/seed/difficulty)
  useEffect(() => {
    setCards(initialDeck);
    resetTimer();
    setMoves(0);
    setWin(false);
    setFirstFlipDone(false);
    setFlippedIds([]);
  }, [initialDeck, resetTimer]);

  // Start timer on first flip
  useEffect(() => {
    if (!firstFlipDone && flippedIds.length === 1 && !running) {
      startTimer();
      setFirstFlipDone(true);
    }
  }, [flippedIds, firstFlipDone, running, startTimer]);

  // Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      if (isDev) console.log('[MemoryMatch] Win detected!');
      stopTimer();
      setWin(true);
      announce('You won! Great memory!');
    }
  }, [cards, stopTimer, isDev]);

  // Announce helper for aria-live
  const announce = (msg) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = msg;
      // clear after short delay to allow multiple announcements
      setTimeout(() => {
        if (liveRegionRef.current) liveRegionRef.current.textContent = '';
      }, 1000);
    }
  };

  const handleFlip = (id) => {
    const card = cards.find((c) => c.id === id);
    if (!card || card.isMatched) return;

    // Prevent flipping more than two or flipping same card twice
    if (flippedIds.includes(id) || flippedIds.length === 2) return;

    // Flip card
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      // Count a move
      setMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;
      const first = cards.find((c) => c.id === firstId);
      const second = cards.find((c) => c.id === secondId);
      if (first && second && first.pairId === second.pairId) {
        // Match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedIds([]);
          announce('Match found!');
        }, 250);
      } else {
        // Not a match, flip back after delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIds([]);
          announce('No match, try again.');
        }, 800);
      }
    }
  };

  const handleRestart = () => {
    // Optionally set a seed to make deterministic
    setSeed((s) => (s == null ? Date.now() : s + 1));
    // Deck/state will reset via useEffect on initialDeck change
  };

  const handleChangeDifficulty = (next) => {
    if (next === difficulty) return;
    setDifficulty(next);
    // timer/moves reset will occur via initialDeck change (pairCount changes)
  };

  const onPlayAgain = () => {
    setWin(false);
    handleRestart();
  };

  const timeFormatted = formatTime(seconds);

  // Global container styling using tokens
  const appStyle = {
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.gradientEndBg} 100%)`,
    color: theme.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  };

  return (
    <div className="App" style={appStyle}>
      {/* aria-live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          height: '1px',
          width: '1px',
          overflow: 'hidden',
        }}
        ref={liveRegionRef}
      />
      <main
        role="main"
        aria-label={`Memory Match Game at ${difficulty} difficulty`}
        style={{
          width: '100%',
          maxWidth: 1100,
          background: theme.surface,
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          padding: '20px 20px 28px',
          border: `1px solid ${theme.surfaceBorder}`,
        }}
        className="shadow-soft"
      >
        <StatusBar
          title="Ocean Memory Match"
          time={timeFormatted}
          moves={moves}
          onRestart={handleRestart}
          difficulty={difficulty}
          onChangeDifficulty={handleChangeDifficulty}
          difficulties={[DIFFICULTIES.EASY, DIFFICULTIES.HARD]}
        />
        <GameBoard
          cols={cols}
          rows={rows}
          cards={cards}
          onFlip={handleFlip}
          theme={theme}
          difficulty={difficulty}
        />
        <WinModal
          open={win}
          time={timeFormatted}
          moves={moves}
          onPlayAgain={onPlayAgain}
          difficulty={difficulty}
        />
        {isDev && (
          <p style={{ marginTop: 10, fontSize: 12, color: theme.textMuted }}>
            Dev: grid {cols}×{rows} • pairs {pairCount} • difficulty {difficulty}
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
