export const GITHUB_URL = "https://github.com/rabihzsiddiqui/audora";

export const LARGE_FILE_THRESHOLD_MB = 300;

export const BITRATE_OPTIONS = [
  { value: "128", label: "128 kbps" },
  { value: "192", label: "192 kbps" },
  { value: "256", label: "256 kbps" },
  { value: "320", label: "320 kbps" },
] as const;

export type BitrateValue = "128" | "192" | "256" | "320";

export const DEFAULT_BITRATE: BitrateValue = "192";
