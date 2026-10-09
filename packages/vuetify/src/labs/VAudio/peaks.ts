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
    return Array.from({ length }, (_, index) => Math.abs(data[index]))
  }

  return Array.from({ length: count }, (_, index) => {
    const start = Math.floor(index * length / count)
    const end = Math.floor((index + 1) * length / count)
    let sum = 0
    let max = 0
    // decoded audio, millions of samples: a plain loop avoids a callback per sample
    for (let i = start; i < end; i++) {
      sum += data[i] * data[i]
      max = Math.max(max, Math.abs(data[i]))
    }
    return strategy === 'rms' ? Math.sqrt(sum / (end - start)) : max
  })
}

const WINDOWS_PER_SECOND = 100
const SLICE_BYTES = 4e6
// decodeAudioData holds the whole file as float PCM (~46MB per stereo minute) and Chrome
// kills the tab past ~90 minutes, before the promise can reject.
const MAX_WHOLE_DURATION = 30 * 60

// ID3 tag or MPEG/ADTS frame sync: these frames resync mid-stream, so any byte slice decodes on its own
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
  const expectedWindows = duration * WINDOWS_PER_SECOND
  const bucketLevels = new Float64Array(Math.min(buckets, Math.max(1, Math.floor(expectedWindows))))
  const bucketCounts = new Uint32Array(bucketLevels.length)
  let windows: number[] = []
  let parts: Uint8Array<ArrayBuffer>[] = []
  let size = 0
  let windowIndex = 0
  let sliceable: boolean | undefined

  function bucketPeaks () {
    return Array.from(bucketLevels, (level, index) => strategy === 'rms' ? Math.sqrt(level / (bucketCounts[index] || 1)) : level)
  }

  async function flush () {
    const bytes = await new Blob(parts).arrayBuffer()
    parts = []
    size = 0

    const audio = await audioContext.decodeAudioData(bytes)
    options.signal?.throwIfAborted()
    const data = audio.getChannelData(0)
    const count = Math.max(1, Math.round(data.length / audio.sampleRate * WINDOWS_PER_SECOND))
    const levels = downsamplePeaks(data, count, strategy)

    if (!expectedWindows) {
      windows = windows.concat(levels)
      return
    }

    levels.forEach(level => {
      const index = Math.min(bucketLevels.length - 1, Math.floor(windowIndex++ / expectedWindows * bucketLevels.length))
      if (strategy === 'rms') {
        bucketLevels[index] += level * level
        bucketCounts[index]++
      } else {
        bucketLevels[index] = Math.max(bucketLevels[index], level)
      }
    })
    options.onProgress?.(bucketPeaks())
  }

  while (true) {
    const { done, value } = await reader.read()
    options.signal?.throwIfAborted()
    if (done) break

    sliceable ??= isSliceable(value)
    if (!sliceable && (duration <= 0 || duration > MAX_WHOLE_DURATION)) {
      reader.cancel()
      return undefined
    }

    parts.push(value)
    size += value.length
    if (sliceable && size >= SLICE_BYTES) {
      await flush()
    }
  }
  if (size) {
    await flush()
  }

  return expectedWindows ? bucketPeaks() : downsamplePeaks(windows, buckets, strategy)
}

export function normalizePeaks (peaks: readonly number[]): number[] {
  const max = peaks.reduce((result, peak) => Math.max(result, peak), 0)

  return peaks.map(peak => max > 0 ? clamp(peak / max, 0, 1) : 0)
}
