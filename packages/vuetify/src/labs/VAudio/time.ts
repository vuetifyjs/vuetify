// Utilities
import { clamp, formatTime } from '@/util'

export const PLACEHOLDER_TIME = '--:--'

// Upstream `formatTime` guards nothing: negatives render as `-1:-5` and non-finite input
// as `NaN:NaN`. Both are reachable here — `duration - elapsed` goes negative on a seek
// past a rounded duration, and live streams report `Infinity`.
export function formatDuration (seconds: number, duration = 0): string {
  if (!Number.isFinite(seconds)) return PLACEHOLDER_TIME

  const upper = Number.isFinite(duration) && duration > 0 ? duration : Number.POSITIVE_INFINITY

  return formatTime(clamp(seconds, 0, upper))
}
