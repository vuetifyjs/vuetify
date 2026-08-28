// Utilities
import { downsamplePeaks } from './peaks'

// Types
import type { SampleStrategy } from './peaks'

const CACHE_LIMIT = 32
const cache = new Map<string, number[]>()

function remember (key: string, peaks: number[]) {
  if (cache.size >= CACHE_LIMIT) {
    const oldest = cache.keys().next()
    if (!oldest.done) cache.delete(oldest.value)
  }
  cache.set(key, peaks)
}

export function getCachedPeaks (src: string, bars: number, strategy: SampleStrategy) {
  return cache.get(`${src}:${bars}:${strategy}`)
}

// Peaks are cached un-normalized so toggling `normalize` never invalidates the entry.
export async function decodePeaks (
  src: string,
  bars: number,
  strategy: SampleStrategy,
  signal: AbortSignal,
): Promise<number[]> {
  const key = `${src}:${bars}:${strategy}`
  const cached = cache.get(key)
  if (cached) return cached

  const Ctor = window.AudioContext ?? (window as any).webkitAudioContext
  if (!Ctor) throw new Error('Web Audio is unavailable')

  const response = await fetch(src, { signal })
  if (!response.ok) throw new Error(`Failed to fetch audio: ${response.status}`)

  const buffer = await response.arrayBuffer()
  if (signal.aborted) throw new DOMException('Aborted', 'AbortError')

  const context: AudioContext = new Ctor()
  try {
    const decoded = await context.decodeAudioData(buffer)
    const peaks = downsamplePeaks(decoded.getChannelData(0), bars, strategy)
    remember(key, peaks)
    return peaks
  } finally {
    context.close()
  }
}
