import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useTimer provides a simple elapsed seconds timer with controls.
 * - start(): begins ticking each second
 * - stop(): pauses
 * - reset(): set back to 0 and stop
 */
export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }, [running]);

  const stop = useCallback(() => {
    setRunning(false);
    clear();
  }, [clear]);

  const reset = useCallback(() => {
    setSeconds(0);
    setRunning(false);
    clear();
  }, [clear]);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return { seconds, running, start, stop, reset };
}
