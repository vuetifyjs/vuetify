// Utilities
import { nextTick, onScopeDispose, shallowRef, watch } from 'vue'
import { clamp, createRange, IN_BROWSER, isNullOrUndefined, isNumber, isString, isUndefined, parseTime } from '@/util'

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
  return clamp(volume || 0, 0, 100) / 100
}

export function resolveSeekTarget (target: MediaSeekTarget, current: number, total: number) {
  const value = 'to' in target ? target.to : target.by
  const seconds = isString(value) && value.trim().endsWith('%')
    ? parseFloat(value) / 100 * total
    : Number(value)

  return 'to' in target ? seconds : current + seconds
}

export function parseActions (actions: string | readonly (string | readonly string[])[]) {
  return isString(actions)
    ? actions.split(/([()])|[\s,]+/).filter(Boolean)
    : actions.flatMap(item => isString(item) ? item : ['(', ...item, ')'])
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

  function setProgress (seconds: number, total: number) {
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
    setProgress(next, total)
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

  function syncProgress () {
    const media = el.value
    if (!media || options.scrubbing?.value) return

    setProgress(media.currentTime, media.duration)
  }

  function updateBuffered () {
    const media = el.value
    if (!media || !Number.isFinite(media.duration) || media.duration <= 0) return

    const { buffered: ranges, currentTime } = media
    const index = createRange(ranges.length).find(i => ranges.start(i) <= currentTime && currentTime <= ranges.end(i))
    buffered.value = isUndefined(index) ? 0 : ranges.end(index)
  }

  const listeners: Partial<Record<keyof HTMLMediaElementEventMap, () => void>> = {
    loadedmetadata () {
      const media = el.value
      if (!media) return

      duration.value = Number.isFinite(media.duration) ? media.duration : 0

      if (!isNullOrUndefined(props.startAt) && !startApplied) {
        startApplied = true
        seekTo(parseTime(props.startAt) || 0)
      }

      options.onLoaded?.(media)
    },
    timeupdate () {
      syncProgress()
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
      syncProgress()
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

    Object.entries(listeners).forEach(([name, listener]) => media.addEventListener(name, listener))
    onCleanup(() => {
      Object.entries(listeners).forEach(([name, listener]) => media.removeEventListener(name, listener))
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
    setProgress(0, 0)

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

// iOS ignores volume writes, only mute works there
export function canSetVolume () {
  if (!IN_BROWSER) return true
  if (isUndefined(volumeSettable)) {
    const audio = document.createElement('audio')
    audio.volume = 0.5
    volumeSettable = audio.volume === 0.5
  }

  return volumeSettable
}

export function getVolumeIcon (volume: number) {
  if (volume > 50) return '$volumeHigh'
  if (volume > 0) return '$volumeMedium'

  return '$volumeOff'
}

const CLOCK_RESYNC = 0.5
const CLOCK_CATCH_UP = 0.02
const CLOCK_HOLD_BACK = 0.2

export interface PlayheadOptions {
  waiting: Ref<boolean>
  scrubbing?: Ref<boolean>
}

// currentTime ticks a few times per second and jumps ahead on resume,
// so while playing, bars inside `container` follow a clock of their own eased toward it
export function usePlayhead (
  el: Ref<HTMLMediaElement | undefined>,
  container: () => HTMLElement | undefined,
  options: PlayheadOptions,
) {
  let frame = 0
  let shown = -1
  let shownAt = -1

  function bars () {
    return container()?.querySelectorAll<HTMLElement>('.v-media-progress-bar') ?? []
  }

  function paint (media: HTMLMediaElement, now: number) {
    const reported = media.currentTime
    const expected = shown + (shownAt < 0 ? 0 : now - shownAt) / 1000 * media.playbackRate
    shown = shown < 0 || options.waiting.value || Math.abs(reported - expected) > CLOCK_RESYNC
      ? reported
      : expected + (reported - expected) * (reported > expected ? CLOCK_CATCH_UP : CLOCK_HOLD_BACK)
    shownAt = now

    const total = media.duration
    const playhead = Number.isFinite(total) && total > 0
      ? clamp(100 * shown / total, 0, 100)
      : 0

    // a bar being dragged shows the pointer, not the media
    bars().forEach(bar => bar.classList.contains('v-media-progress-bar--dragging')
      ? bar.style.removeProperty('--v-media-progress-bar-playhead')
      : bar.style.setProperty('--v-media-progress-bar-playhead', String(playhead))
    )
  }

  function tick () {
    const media = el.value
    if (!media || media.paused || options.scrubbing?.value) {
      stop()
      return
    }

    paint(media, performance.now())
    frame = requestAnimationFrame(tick)
  }

  function start () {
    if (frame || !container()) return

    shownAt = -1
    frame = requestAnimationFrame(tick)
  }

  function stop () {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    bars().forEach(bar => bar.style.removeProperty('--v-media-progress-bar-playhead'))
  }

  const listeners = { play: start, pause: stop, seeking: () => shown = -1 }

  watch(el, (media, _, onCleanup) => {
    if (!media) return

    Object.entries(listeners).forEach(([name, listener]) => media.addEventListener(name, listener))
    onCleanup(() => {
      Object.entries(listeners).forEach(([name, listener]) => media.removeEventListener(name, listener))
    })
  }, { immediate: true })

  watch([() => options.scrubbing?.value, container], () => {
    if (el.value && !el.value.paused) start()
  })

  onScopeDispose(stop)
}
