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

  watch(() => toValue(keys), function (unrefKeys) {
    cleanup()

    if (unrefKeys) {
      isSequence.value = unrefKeys.includes('-')
      keyGroups.value = isSequence.value ? unrefKeys.toLowerCase().split('-') : [unrefKeys.toLowerCase()]
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
    const parts = group.split(/[+_]/)
    const modifiers = Object.fromEntries(
      ['ctrl', 'shift', 'alt', 'meta', 'cmd'].map(key => [key, parts.includes(key)])
    ) as Record<string, boolean>
    const actualKey = parts.find(part => !['ctrl', 'shift', 'alt', 'meta', 'cmd'].includes(part))
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
