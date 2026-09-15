// Utilities
import { clamp } from '@/util'

export type SampleStrategy = 'peak' | 'rms'

export function downsamplePeaks (
  data: ArrayLike<number>,
  buckets: number,
  strategy: SampleStrategy = 'peak',
): number[] {
  const length = data.length
  const count = Math.floor(buckets)

  if (!length || count <= 0) return []
  if (length <= count) {
    return Array.from({ length }, (_, i) => Math.abs(data[i]))
  }

  const bucketSize = Math.floor(length / count)
  const peaks: number[] = []

  for (let i = 0; i < count; i++) {
    const start = i * bucketSize
    const end = i === count - 1 ? length : start + bucketSize

    if (strategy === 'rms') {
      let sum = 0
      for (let j = start; j < end; j++) sum += data[j] * data[j]
      peaks.push(Math.sqrt(sum / (end - start)))
    } else {
      let max = 0
      for (let j = start; j < end; j++) {
        const v = Math.abs(data[j])
        if (v > max) max = v
      }
      peaks.push(max)
    }
  }

  return peaks
}

export function normalizePeaks (peaks: readonly number[]): number[] {
  let max = 0
  for (const peak of peaks) {
    if (peak > max) max = peak
  }

  if (max <= 0) return peaks.map(() => 0)

  return peaks.map(peak => clamp(peak / max, 0, 1))
}
