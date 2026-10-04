// Utilities
import { nextTick, onScopeDispose, shallowRef, watch } from 'vue'
import { clamp, isNumber, isString } from '@/util'

// Types
import type { Ref } from 'vue'

export type MediaSeekTarget = { to: number | string } | { by: number | string }
export type MediaSeekStep = number | readonly [number, number]

export interface MediaProps {
  src?: string
  srcObject?: MediaProvider | null
  startAt?: number | string
}

export interface MediaOptions<T extends HTMLMediaElement> {
  playing: Ref<boolean>
  progress: Ref<number>
  volume: Ref<number>
  error: Ref<MediaError | boolean | undefined>
  playbackRate?: Ref<number>
  scrubbing?: Ref<boolean>
  onPlay?: () => void
  onLoaded?: (el: T) => void
  onEnded?: () => void
  onError?: (error: MediaError | boolean) => void
}

function toElementVolume (volume: number) {
  return clamp(Number(volume) || 0, 0, 100) / 100
}

export function resolveSeekTarget (target: MediaSeekTarget, current: number, total: number) {
  const value = 'to' in target ? target.to : target.by
  const seconds = isString(value) && value.trim().endsWith('%')
    ? parseFloat(value) / 100 * total
    : Number(value)

  return 'to' in target ? seconds : current + seconds
}

export function getSeekStep (step: MediaSeekStep, large: boolean) {
  const [small, big] = isNumber(step) ? [step, step * 10] : step
  return large ? big : small
}

export function useMedia<T extends HTMLMediaElement> (
  el: Ref<T | undefined>,
  props: MediaProps,
  options: MediaOptions<T>,
) {
  const { playing, progress, volume, error, playbackRate } = options

  const duration = shallowRef(0)
  const buffered = shallowRef(0)
  const waiting = shallowRef(false)

  let startApplied = false

  function writePosition (seconds: number, total: number) {
    progress.value = Number.isFinite(total) && total > 0
      ? clamp(100 * seconds / total, 0, 100)
      : 0
  }

  function seekTo (seconds: number) {
    const media = el.value
    if (!media) return

    const total = Number.isFinite(media.duration) ? media.duration : 0
    const next = clamp(seconds, 0, total || seconds)

    media.currentTime = next
    writePosition(next, total)
  }

  function seek (target: MediaSeekTarget) {
    const media = el.value
    if (!media) return

    const seconds = resolveSeekTarget(target, media.currentTime, media.duration)
    if (Number.isFinite(seconds)) seekTo(seconds)
  }

  async function play () {
    const media = el.value
    if (!media) return

    try {
      await media.play()
    } catch {
      playing.value = false
    }
  }

  function pause () {
    el.value?.pause()
  }

  function stop () {
    const media = el.value
    if (!media) return

    media.pause()
    seekTo(0)
    playing.value = false
  }

  function retry () {
    error.value = false
    el.value?.load()
  }

  function onTimeupdate () {
    const media = el.value
    if (!media || options.scrubbing?.value) return

    writePosition(media.currentTime, media.duration)
  }

  function updateBuffered () {
    const media = el.value
    if (!media || !Number.isFinite(media.duration) || media.duration <= 0) return

    const { buffered: ranges, currentTime } = media
    let end = 0
    for (let i = 0; i < ranges.length; i++) {
      if (ranges.start(i) <= currentTime && currentTime <= ranges.end(i)) {
        end = ranges.end(i)
        break
      }
    }
    buffered.value = end
  }

  const listeners: Partial<Record<keyof HTMLMediaElementEventMap, () => void>> = {
    loadedmetadata () {
      const media = el.value
      if (!media) return

      duration.value = Number.isFinite(media.duration) ? media.duration : 0

      if (props.startAt != null && !startApplied) {
        startApplied = true
        seekTo(Number(props.startAt) || 0)
      }

      options.onLoaded?.(media)
    },
    timeupdate () {
      onTimeupdate()
      updateBuffered()
    },
    progress: updateBuffered,
    seeked: updateBuffered,
    play () {
      options.onPlay?.()
      playing.value = true
    },
    pause () {
      playing.value = false
      onTimeupdate()
    },
    ended () {
      playing.value = false
      options.onEnded?.()
    },
    error () {
      error.value = el.value?.error ?? true
      waiting.value = false
      options.onError?.(error.value)
    },
    waiting () {
      waiting.value = true
    },
    playing () {
      waiting.value = false
    },
    canplay () {
      waiting.value = false
    },
  }

  watch(el, (media, _, onCleanup) => {
    if (!media) return

    media.volume = toElementVolume(volume.value)
    if (playbackRate) media.defaultPlaybackRate = media.playbackRate = playbackRate.value
    if (props.srcObject) media.srcObject = props.srcObject

    for (const [name, listener] of Object.entries(listeners)) {
      media.addEventListener(name, listener)
    }
    onCleanup(() => {
      for (const [name, listener] of Object.entries(listeners)) {
        media.removeEventListener(name, listener)
      }
    })
  }, { immediate: true })

  watch(playing, value => {
    const media = el.value
    if (!media || value === !media.paused) return

    if (value) play()
    else pause()
  })

  watch(volume, value => {
    if (el.value) el.value.volume = toElementVolume(value)
  })

  watch(() => playbackRate?.value, value => {
    if (el.value && value) el.value.defaultPlaybackRate = el.value.playbackRate = value
  })

  watch(error, value => {
    if (value) el.value?.pause()
  })

  watch(() => props.srcObject, value => {
    if (el.value) el.value.srcObject = value ?? null
  })

  watch([() => props.src, () => props.srcObject], () => {
    duration.value = 0
    buffered.value = 0
    waiting.value = false
    error.value = false
    writePosition(0, 0)

    // <source> src changes are ignored until load()
    nextTick(() => el.value?.load())
  })

  onScopeDispose(() => {
    const media = el.value
    if (!media) return

    media.pause()
    media.srcObject = null
  })

  return {
    duration,
    buffered,
    waiting,
    play,
    pause,
    stop,
    seek,
    retry,
  }
}

export function useMute (volume: Ref<number>, dragging?: Ref<boolean>) {
  let lastVolume = volume.value || 100

  watch(volume, value => {
    if (value > 0 && !dragging?.value) lastVolume = value
  })

  function toggleMuted () {
    if (volume.value > 0) {
      lastVolume = volume.value
      volume.value = 0
    } else {
      volume.value = lastVolume
    }
  }

  return { toggleMuted }
}

let volumeSettable: boolean | undefined

export function canSetVolume () {
  if (volumeSettable == null) {
    const audio = document.createElement('audio')
    audio.volume = 0.5
    volumeSettable = audio.volume === 0.5
  }

  return volumeSettable
}

export function getVolumeIcon (volume: number) {
  if (volume > 50) return '$volumeHigh'
  if (volume > 0) return '$volumeLow'

  return '$volumeOff'
}
