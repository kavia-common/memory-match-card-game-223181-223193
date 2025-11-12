function mulberry32(seed) {
  // Small, fast, deterministic PRNG
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * PUBLIC_INTERFACE
 * shuffle returns a new array shuffled. If seed provided, order is deterministic.
 * @param {Array<any>} arr
 * @param {number} [seed]
 * @returns {Array<any>}
 */
export function shuffle(arr, seed) {
  const a = [...arr];
  const rand = seed != null ? mulberry32(seed) : Math.random;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
