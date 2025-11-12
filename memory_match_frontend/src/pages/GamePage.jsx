import React, { useContext, useMemo, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ThemeContext } from '../context/ThemeContext';
import theme from '../styles/theme';
import StatusBar from '../components/StatusBar';
import GameBoard from '../components/GameBoard';
import WinModal from '../components/WinModal';
import { createDeck } from '../utils/deck';
import { shuffle } from '../utils/shuffle';
import { formatTime } from '../utils/formatTime';
import useTimer from '../hooks/useTimer';

/**
 * PUBLIC_INTERFACE
 * GamePage renders the Memory Match game, reading username and difficulty from context.
 * If username is missing, a redirect element is rendered, but Hooks remain top-level to satisfy rules-of-hooks.
 */
export default function GamePage() {
  const { username, difficulty } = useContext(AppContext);
  const { themeKey } = useContext(ThemeContext);
  const shouldRedirect = !username; // compute flag, don't early return before hooks

  // Difficulty mapping (kept consistent with prior App.js)
  const DIFFICULTIES = {
    EASY: '4x4',
    HARD: '6x6',
  };

  const { cols, rows, pairCount } = useMemo(() => {
    if (difficulty === DIFFICULTIES.HARD) {
      return { cols: 6, rows: 6, pairCount: 18 };
    }
    return { cols: 4, rows: 4, pairCount: 8 };
  }, [difficulty]);

  // Map themeKey to deck faces by overriding emojis after deck creation.
  // Fruits and Flower reuse the same layout/styles/behavior; only faces/labels change.
  const FACE_SETS = {
    fish: ['🐚','🐬','🐳','🐟','🦀','🐠','🪸','🐙','🦈','🐢','🦐','🌊','⚓️','🦑','🐡','🌅','🧭','🪙'],
    fruits: ['🍎','🍌','🍓','🍉','🍇','🍒','🍍','🥝','🍑','🍐','🍊','🍈','🥭','🫐','🍋','🍏','🥥','🍅'],
    flower: ['🌸','🌼','🌻','🌷','💐','🌹','🌺','🪻','🌱','🍀','🌿','☘️','🌾','🌵','🪴','🌲','🌳','🌴'],
  };

  const [seed, setSeed] = useState(null);
  const initialDeck = useMemo(() => {
    const baseDeck = createDeck(pairCount);
    const shuffled = shuffle(baseDeck, seed ?? undefined);
    // Apply themed faces deterministically per pairId ordering
    const faces = FACE_SETS[themeKey] || FACE_SETS.fish;
    const themed = [];
    const pairToFace = new Map();
    let faceIndex = 0;
    for (const c of shuffled) {
      if (!pairToFace.has(c.pairId)) {
        pairToFace.set(c.pairId, faces[faceIndex % faces.length]);
        faceIndex += 1;
      }
    }
    for (const c of shuffled) {
      themed.push({ ...c, face: pairToFace.get(c.pairId) });
    }
    return themed;
  }, [pairCount, seed, themeKey]);

  const [cards, setCards] = useState(initialDeck);
  const [flippedIds, setFlippedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);
  const [firstFlipDone, setFirstFlipDone] = useState(false);
  const liveRegionRef = useRef(null);

  const { seconds, start, stop, reset, running } = useTimer();

  useEffect(() => {
    setCards(initialDeck);
    reset();
    setMoves(0);
    setWin(false);
    setFirstFlipDone(false);
    setFlippedIds([]);
  }, [initialDeck, reset]);

  useEffect(() => {
    if (!firstFlipDone && flippedIds.length === 1 && !running) {
      start();
      setFirstFlipDone(true);
    }
  }, [flippedIds, firstFlipDone, running, start]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      stop();
      setWin(true);
      announce('You won! Great memory!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const announce = (msg) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = msg;
      setTimeout(() => {
        if (liveRegionRef.current) liveRegionRef.current.textContent = '';
      }, 1000);
    }
  };

  const handleFlip = (id) => {
    const card = cards.find((c) => c.id === id);
    if (!card || card.isMatched) return;
    if (flippedIds.includes(id) || flippedIds.length === 2) return;

    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)));
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;
      const first = cards.find((c) => c.id === firstId);
      const second = cards.find((c) => c.id === secondId);
      if (first && second && first.pairId === second.pairId) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.pairId === first.pairId ? { ...c, isMatched: true } : c)));
          setFlippedIds([]);
          announce('Match found!');
        }, 250);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c)));
          setFlippedIds([]);
          announce('No match, try again.');
        }, 800);
      }
    }
  };

  const handleRestart = () => {
    setSeed((s) => (s == null ? Date.now() : s + 1));
  };

  const onPlayAgain = () => {
    setWin(false);
    handleRestart();
  };

  const timeFormatted = formatTime(seconds);

  // After all hooks are declared, decide to redirect if needed
  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.gradientEndBg} 100%)`,
        color: theme.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
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
      >
        <StatusBar
          title={`Memory Match • ${username}`}
          time={timeFormatted}
          moves={moves}
          onRestart={handleRestart}
          difficulty={difficulty}
          onChangeDifficulty={null}
          difficulties={['4x4', '6x6']}
        />
        <div style={{color: theme.textMuted, fontSize: 12, marginBottom: 8}}>
          Theme: <strong style={{color: theme.text}}>{(themeKey || 'fish').charAt(0).toUpperCase() + (themeKey || 'fish').slice(1)}</strong>
        </div>
        <GameBoard
          cols={cols}
          rows={rows}
          cards={cards}
          onFlip={handleFlip}
          theme={theme}
          difficulty={difficulty}
        />
        <WinModal open={win} time={timeFormatted} moves={moves} onPlayAgain={onPlayAgain} difficulty={difficulty} />
      </main>
    </div>
  );
}
