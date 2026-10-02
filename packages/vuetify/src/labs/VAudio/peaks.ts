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

  const peaks: number[] = []

  for (let i = 0; i < count; i++) {
    const start = Math.floor(i * length / count)
    const end = Math.floor((i + 1) * length / count)

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

const WINDOWS_PER_SECOND = 100
const SLICE_BYTES = 4e6
// decodeAudioData holds the whole file as float PCM (~46MB per stereo minute) and Chrome
// kills the tab past ~90 minutes, before the promise can reject.
const MAX_WHOLE_DURATION = 30 * 60

// MPEG audio and ADTS AAC frames resync mid-stream, so any byte slice decodes on its own.
function isSliceable (head: Uint8Array) {
  return (head[0] === 0x49 && head[1] === 0x44 && head[2] === 0x33) ||
    (head[0] === 0xFF && (head[1] & 0xE0) === 0xE0)
}

export async function decodePeaks (source: Blob, options: {
  buckets: number
  strategy?: SampleStrategy
  duration?: number
  signal?: AbortSignal
  onProgress?: (peaks: number[]) => void
}): Promise<number[] | undefined> {
  const { buckets, strategy = 'peak', duration = 0 } = options
  const reader = source.stream().getReader()
  const audioContext = new OfflineAudioContext(1, 1, 44100)
  const total = duration * WINDOWS_PER_SECOND
  const sums = new Float64Array(Math.min(buckets, Math.max(1, Math.floor(total))))
  const counts = new Uint32Array(sums.length)
  const windows: Float32Array[] = []
  let parts: Uint8Array[] = []
  let size = 0
  let windowIndex = 0
  let sliceable: boolean | undefined

  function bucketPeaks () {
    return Array.from(sums, (sum, i) => strategy === 'rms' ? Math.sqrt(sum / (counts[i] || 1)) : sum)
  }

  async function flush () {
    const bytes = new Uint8Array(size)
    let offset = 0
    for (const part of parts) {
      bytes.set(part, offset)
      offset += part.length
    }
    parts = []
    size = 0

    const audio = await audioContext.decodeAudioData(bytes.buffer)
    options.signal?.throwIfAborted()
    const data = audio.getChannelData(0)
    const count = Math.max(1, Math.round(data.length / audio.sampleRate * WINDOWS_PER_SECOND))
    const levels = downsamplePeaks(data, count, strategy)

    if (!total) {
      windows.push(Float32Array.from(levels))
      return
    }

    for (const level of levels) {
      const index = Math.min(sums.length - 1, Math.floor(windowIndex++ / total * sums.length))
      if (strategy === 'rms') {
        sums[index] += level * level
        counts[index]++
      } else if (level > sums[index]) {
        sums[index] = level
      }
    }
    options.onProgress?.(bucketPeaks())
  }

  while (true) {
    const { done, value } = await reader.read()
    options.signal?.throwIfAborted()
    if (done) break

    sliceable ??= isSliceable(value)
    if (!sliceable && !(duration > 0 && duration <= MAX_WHOLE_DURATION)) {
      reader.cancel()
      return undefined
    }

    parts.push(value)
    size += value.length
    if (sliceable && size >= SLICE_BYTES) await flush()
  }
  if (size) await flush()
  if (total) return bucketPeaks()

  const all = new Float32Array(windows.reduce((sum, w) => sum + w.length, 0))
  let offset = 0
  for (const w of windows) {
    all.set(w, offset)
    offset += w.length
  }
  return downsamplePeaks(all, buckets, strategy)
}

export function normalizePeaks (peaks: readonly number[]): number[] {
  let max = 0
  for (const peak of peaks) {
    if (peak > max) max = peak
  }

  if (max <= 0) return peaks.map(() => 0)

  return peaks.map(peak => clamp(peak / max, 0, 1))
}
