// Composables
import { splitKeyCombination, splitKeySequence } from '@/composables/hotkey/hotkey-parsing'

// Utilities
import { onBeforeUnmount, toValue, watch } from 'vue'
import { IN_BROWSER } from '@/util'
import { getCurrentInstance } from '@/util/getCurrentInstance'

// Types
import type { MaybeRef } from '@/util'

interface HotkeyOptions {
  event?: MaybeRef<'keydown' | 'keyup'>
  inputs?: MaybeRef<boolean>
  preventDefault?: MaybeRef<boolean>
  sequenceTimeout?: MaybeRef<number>
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

  const isMac = navigator?.userAgent?.includes('Macintosh') ?? false
  let timeout = 0
  let keyGroups: string[]
  let isSequence = false
  let groupIndex = 0

  function clearTimer () {
    if (!timeout) return

    clearTimeout(timeout)
    timeout = 0
  }

  function isInputFocused () {
    if (toValue(inputs)) return false

    const activeElement = document.activeElement as HTMLElement

    return activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable ||
      activeElement.contentEditable === 'true'
    )
  }

  function resetSequence () {
    groupIndex = 0
    clearTimer()
  }

  function handler (e: KeyboardEvent) {
    const group = keyGroups[groupIndex]

    if (!group || isInputFocused()) return

    if (!matchesKeyGroup(e, group)) {
      if (isSequence) resetSequence()
      return
    }

    if (toValue(preventDefault)) e.preventDefault()

    if (!isSequence) {
      callback(e)
      return
    }

    clearTimer()
    groupIndex++

    if (groupIndex === keyGroups.length) {
      callback(e)
      resetSequence()
      return
    }

    timeout = window.setTimeout(resetSequence, toValue(sequenceTimeout))
  }

  function cleanup () {
    window.removeEventListener(toValue(event), handler)
    clearTimer()
  }

  watch(() => toValue(keys), function (unrefKeys) {
    cleanup()

    if (unrefKeys) {
      const groups = splitKeySequence(unrefKeys.toLowerCase())
      isSequence = groups.length > 1
      keyGroups = groups
      resetSequence()
      window.addEventListener(toValue(event), handler)
    }
  }, { immediate: true })

  // Watch for changes in the event type to re-register the listener
  watch(() => toValue(event), function (newEvent, oldEvent) {
    if (oldEvent && keyGroups && keyGroups.length > 0) {
      window.removeEventListener(oldEvent, handler)
      window.addEventListener(newEvent, handler)
    }
  })

  try {
    getCurrentInstance('useHotkey')
    onBeforeUnmount(cleanup)
  } catch {
    // Not in Vue setup context
  }

  function parseKeyGroup (group: string) {
    const MODIFIERS = ['ctrl', 'shift', 'alt', 'meta', 'cmd']

    // Use the shared combination splitting logic
    const parts = splitKeyCombination(group.toLowerCase())

    // If the combination is invalid, return empty result
    if (parts.length === 0) {
      return { modifiers: Object.fromEntries(MODIFIERS.map(m => [m, false])), actualKey: undefined }
    }

    const modifiers = Object.fromEntries(MODIFIERS.map(m => [m, false])) as Record<string, boolean>
    let actualKey: string | undefined

    for (const part of parts) {
      if (MODIFIERS.includes(part)) {
        modifiers[part] = true
      } else {
        actualKey = part
      }
    }

    return { modifiers, actualKey }
  }

  function matchesKeyGroup (e: KeyboardEvent, group: string) {
    const { modifiers, actualKey } = parseKeyGroup(group)

    const expectCtrl = modifiers.ctrl || (!isMac && (modifiers.cmd || modifiers.meta))
    const expectMeta = isMac && (modifiers.cmd || modifiers.meta)

    return (
      e.ctrlKey === expectCtrl &&
      e.metaKey === expectMeta &&
      e.shiftKey === modifiers.shift &&
      e.altKey === modifiers.alt &&
      e.key.toLowerCase() === actualKey?.toLowerCase()
    )
  }

  return cleanup
}
