 /**
  * PUBLIC_INTERFACE
  * formatTime converts seconds to mm:ss string with leading zeros.
  * @param {number} seconds
  * @returns {string}
  */
export function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(rem).padStart(2, '0');
  return `${mm}:${ss}`;
}
