// Utilities
import { onBeforeUnmount, shallowRef, toValue, watch } from 'vue'
import { IN_BROWSER } from '@/util'
import { getCurrentInstance } from '@/util/getCurrentInstance'

// Types
import type { MaybeRef } from '@/util'

interface HotkeyOptions {
  event?: 'keydown' | 'keyup'
  inputs?: boolean
  preventDefault?: boolean
  sequenceTimeout?: number
}

export function useHotkey (
  keys: MaybeRef<string | undefined>,
  callback: (e: KeyboardEvent) => void,
  options: HotkeyOptions = {}
) {
  if (!IN_BROWSER) return function () {}

  const {
    event = 'keydown',
    inputs = false,
    preventDefault = true,
    sequenceTimeout = 1000,
  } = options

  const isMac = navigator?.userAgent?.includes('Macintosh')
  const timer = shallowRef<ReturnType<typeof setTimeout> | undefined>()
  const keyGroups = shallowRef<string[]>([])
  const isSequence = shallowRef(false)
  const groupIndex = shallowRef(0)

  function clearTimer () {
    if (!timer.value) return

    clearTimeout(timer.value)
    timer.value = undefined
  }

  function isInputFocused () {
    if (inputs) return false

    const activeElement = document.activeElement as HTMLElement

    return activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable ||
      activeElement.contentEditable === 'true'
    )
  }

  function resetSequence () {
    groupIndex.value = 0
    clearTimer()
  }

  function handler (e: KeyboardEvent) {
    const group = keyGroups.value[groupIndex.value]

    if (!group || isInputFocused()) return

    if (!matchesKeyGroup(e, group)) {
      if (isSequence.value) resetSequence()
      return
    }

    if (preventDefault) e.preventDefault()

    if (!isSequence.value) {
      callback(e)
      return
    }

    clearTimer()
    groupIndex.value++

    if (groupIndex.value === keyGroups.value.length) {
      callback(e)
      resetSequence()
      return
    }

    timer.value = setTimeout(resetSequence, sequenceTimeout)
  }

  function cleanup () {
    window.removeEventListener(event, handler)
    clearTimer()
  }

  function splitKeySequence (str: string) {
    const groups: string[] = []
    let current = ''
    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      if (char === '-') {
        const next = str[i + 1]
        // Treat '-' as a sequence delimiter only if the next character exists
        // and is NOT one of '-', '+', or '_' (these indicate the '-' belongs to the key itself)
        if (next && !['-', '+', '_'].includes(next)) {
          groups.push(current)
          current = ''
          continue
        }
      }
      current += char
    }
    groups.push(current)

    return groups
  }

  watch(() => toValue(keys), function (unrefKeys) {
    cleanup()

    if (unrefKeys) {
      const groups = splitKeySequence(unrefKeys.toLowerCase())
      isSequence.value = groups.length > 1
      keyGroups.value = groups
      resetSequence()
      window.addEventListener(event, handler)
    }
  }, { immediate: true })

  try {
    getCurrentInstance('useHotkey')
    onBeforeUnmount(cleanup)
  } catch {
    // Not in Vue setup context
  }

  function parseKeyGroup (group: string) {
    const MODIFIERS = ['ctrl', 'shift', 'alt', 'meta', 'cmd']

    // Split on +, -, or _ but keep empty strings which indicate consecutive separators (e.g. alt--)
    const parts = group.toLowerCase().split(/[+_-]/)

    const modifiers = Object.fromEntries(MODIFIERS.map(m => [m, false])) as Record<string, boolean>
    let actualKey: string | undefined

    for (const part of parts) {
      if (!part) continue // Skip empty tokens
      if (MODIFIERS.includes(part)) {
        modifiers[part] = true
      } else {
        actualKey = part
      }
    }

    // Fallback for cases where actualKey is a literal '+' or '-' (e.g. alt--, alt++ , alt+-, alt-+)
    if (!actualKey) {
      const lastChar = group.slice(-1)
      if (lastChar === '+' || lastChar === '-') actualKey = lastChar
    }

    return { modifiers, actualKey }
  }

  function matchesKeyGroup (e: KeyboardEvent, group: string) {
    const { modifiers, actualKey } = parseKeyGroup(group)

    return (
      e.ctrlKey === (isMac && modifiers.cmd ? false : modifiers.ctrl) &&
      e.metaKey === (isMac && modifiers.cmd ? true : modifiers.meta) &&
      e.shiftKey === modifiers.shift &&
      e.altKey === modifiers.alt &&
      e.key.toLowerCase() === actualKey?.toLowerCase()
    )
  }

  return cleanup
}
