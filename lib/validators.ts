import { parseTime } from "./time";

export interface TrimOptions {
  startTime: string;
  duration: string;
}

export interface TrimErrors {
  startTime?: string;
  duration?: string;
}

/**
 * Validates trim fields. Returns an object with any field errors.
 */
export function validateTrim(opts: TrimOptions): TrimErrors {
  const errors: TrimErrors = {};

  if (opts.startTime.trim() !== "") {
    const secs = parseTime(opts.startTime);
    if (isNaN(secs)) {
      errors.startTime = "enter a valid time in mm:ss format (e.g. 0:30)";
    } else if (secs < 0) {
      errors.startTime = "start time cannot be negative";
    }
  }

  if (opts.duration.trim() !== "") {
    const secs = parseTime(opts.duration);
    if (isNaN(secs)) {
      errors.duration = "enter a valid duration in mm:ss format (e.g. 2:00)";
    } else if (secs <= 0) {
      errors.duration = "duration must be greater than zero";
    }
  }

  return errors;
}

/**
 * Returns true if trim validation passes (no errors).
 */
export function isTrimValid(opts: TrimOptions): boolean {
  return Object.keys(validateTrim(opts)).length === 0;
}

export interface ConvertOptions {
  bitrate: string;
  mono: boolean;
  startTime: string;
  duration: string;
}

export interface ConvertErrors {
  startTime?: string;
  duration?: string;
  bitrate?: string;
}

export function validateConvertOptions(opts: ConvertOptions): ConvertErrors {
  const validBitrates = ["128", "192", "256", "320"];
  const errors: ConvertErrors = {};

  if (!validBitrates.includes(opts.bitrate)) {
    errors.bitrate = "select a valid bitrate";
  }

  const trimErrors = validateTrim({ startTime: opts.startTime, duration: opts.duration });
  if (trimErrors.startTime) errors.startTime = trimErrors.startTime;
  if (trimErrors.duration) errors.duration = trimErrors.duration;

  return errors;
}
