// Composables
import { APPLE_PLATFORM, isAltGraph, isComposing, isModifierKey } from '@/composables/hotkey/hotkey'

// Utilities
import { onScopeDispose, shallowRef, toValue } from 'vue'

// Types
import type { MaybeRef } from '@/util'

interface HotkeyRecorderOptions {
  recordBy?: MaybeRef<'code' | 'key'>
  maxSteps?: MaybeRef<number>
  idleTimeout?: MaybeRef<number>
  onRecord?: (keys: string) => void
  onCancel?: () => void
  onClear?: () => void
}

// characters that are syntax in hotkey strings
const reservedKeys: Record<string, string> = {
  '+': 'plus',
  '-': 'minus',
  '/': 'slash',
  _: 'underscore',
  ' ': 'space',
}

export function useHotkeyRecorder (options: HotkeyRecorderOptions = {}) {
  const recording = shallowRef(false)
  const steps = shallowRef<string[]>([])
  const pressed = new Map<string, string>()
  let timer = 0

  function schedule () {
    clearTimeout(timer)
    const timeout = toValue(options.idleTimeout)
    if (timeout && steps.value.length) timer = window.setTimeout(commit, timeout)
  }

  function start () {
    steps.value = []
    recording.value = true
  }

  function cancel () {
    if (!recording.value) return
    clearTimeout(timer)
    recording.value = false
    steps.value = []
    options.onCancel?.()
  }

  function commit () {
    if (!recording.value || !steps.value.length) return
    const keys = steps.value.join('-')
    clearTimeout(timer)
    recording.value = false
    steps.value = []
    options.onRecord?.(keys)
  }

  function keyName (e: KeyboardEvent) {
    if (toValue(options.recordBy) === 'key' && e.key !== 'Dead' && e.key !== 'Unidentified') {
      return reservedKeys[e.key] ?? e.key.toLowerCase()
    }
    return e.code ? `[${e.code}]` : undefined
  }

  function onKeydown (e: KeyboardEvent) {
    if (!recording.value || isComposing(e)) return

    const isMac = APPLE_PLATFORM.test(navigator.userAgent)
    const unmodified = !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey

    // keep keyboard users able to leave the field
    if (e.key === 'Tab' && (unmodified || (e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey))) return

    e.preventDefault()
    e.stopPropagation()
    pressed.set(e.code || e.key, e.key)

    if (e.repeat || isModifierKey(e.key)) return

    if (unmodified && e.key === 'Escape') return cancel()

    if (unmodified && (e.key === 'Backspace' || e.key === 'Delete')) {
      if (steps.value.length) {
        steps.value = steps.value.slice(0, -1)
        schedule()
      } else {
        clearTimeout(timer)
        recording.value = false
        options.onClear?.()
      }
      return
    }

    if (unmodified && e.key === 'Enter' && steps.value.length) return commit()

    // the Windows key can't be expressed, `meta` means Ctrl outside macOS
    if (isAltGraph(e, isMac) || (!isMac && e.metaKey)) return

    const key = keyName(e)
    if (!key) return

    const chord = [
      e.ctrlKey && 'ctrl',
      e.metaKey && 'meta',
      e.altKey && 'alt',
      e.shiftKey && 'shift',
      key,
    ].filter(Boolean).join('+')

    // past the limit a new chord starts over, so a mistake is fixed by typing again
    const maxSteps = Math.max(1, toValue(options.maxSteps) ?? 1)
    steps.value = steps.value.length >= maxSteps ? [chord] : [...steps.value, chord]
    schedule()
  }

  // keyups of recorded keys must not reach keyup hotkeys, even after the recording ends
  function onKeyup (e: KeyboardEvent) {
    const id = e.code || e.key
    if (!recording.value && !pressed.has(id)) return

    e.stopPropagation()
    pressed.delete(id)

    // macOS drops the keyup of keys released while Cmd is held
    if (isModifierKey(e.key)) {
      for (const [code, key] of pressed) {
        if (!isModifierKey(key)) pressed.delete(code)
      }
    }
  }

  onScopeDispose(() => clearTimeout(timer), true)

  return { recording, steps, start, cancel, commit, onKeydown, onKeyup }
}
