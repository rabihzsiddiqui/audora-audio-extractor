/**
 * Parses a "mm:ss" or "m:ss" string into total seconds.
 * Returns NaN if the input is invalid.
 */
export function parseTime(value: string): number {
  if (!value || value.trim() === "") return NaN;

  const trimmed = value.trim();
  const parts = trimmed.split(":");

  if (parts.length !== 2) return NaN;

  const [mmStr, ssStr] = parts;

  if (!/^\d+$/.test(mmStr) || !/^\d{1,2}$/.test(ssStr)) return NaN;

  const mm = parseInt(mmStr, 10);
  const ss = parseInt(ssStr, 10);

  if (ss >= 60) return NaN;
  if (mm < 0 || ss < 0) return NaN;

  return mm * 60 + ss;
}

/**
 * Formats seconds back to "mm:ss".
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mm = Math.floor(seconds / 60);
  const ss = Math.floor(seconds % 60);
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}
