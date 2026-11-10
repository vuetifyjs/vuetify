// Composables
import { parseKeyCombination } from '@/composables/hotkey/hotkey-parsing'

// Utilities
import { onScopeDispose, toValue, watch } from 'vue'
import { getActiveElement, IN_BROWSER, isString } from '@/util'

// Types
import type { Combo, Key, KeyCombination, Sequence } from '@/composables/hotkey/hotkey-parsing'
import type { MaybeRef } from '@/util'

const MODIFIERS = ['ctrl', 'shift', 'alt', 'meta', 'cmd'] as const
const modifiersSet = new Set(MODIFIERS)
type Modifier = typeof MODIFIERS[number]
function isModifier (key: string): key is Modifier {
  return modifiersSet.has(key as Modifier)
}
const emptyModifiers = Object.fromEntries(MODIFIERS.map(m => [m, false])) as Record<Modifier, boolean>

export const APPLE_PLATFORM = /mac|iphone|ipad|ipod/i
const TEXT_INPUT_TYPES = new Set([
  'text', 'search', 'email', 'password', 'tel', 'url', 'number',
  'date', 'datetime-local', 'month', 'time', 'week',
])
const CONTROL_KEYS = new Set([' ', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'])

function isTextField (element: HTMLElement) {
  if (element.tagName === 'INPUT') return TEXT_INPUT_TYPES.has((element as HTMLInputElement).type)

  return (
    element.tagName === 'TEXTAREA' ||
    element.tagName === 'SELECT' ||
    element.isContentEditable ||
    element.contentEditable === 'true' ||
    ['textbox', 'searchbox', 'combobox'].includes(element.getAttribute('role') ?? '')
  )
}

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

  const isMac = APPLE_PLATFORM.test(navigator?.userAgent ?? '')
  let timeout = 0
  let keyGroups: (Exclude<KeyCombination, Sequence>)[]
  let isSequence = false
  let groupIndex = 0

  function isInputFocused (e: KeyboardEvent) {
    const activeElement = getActiveElement() as HTMLElement | null
    if (toValue(inputs) || !activeElement) return false
    if (isTextField(activeElement)) return true

    // checkboxes, radios, ranges, spinbuttons and button inputs keep the keys they act on
    return (
      (activeElement.tagName === 'INPUT' || activeElement.getAttribute('role') === 'spinbutton') &&
      !e.ctrlKey && !e.metaKey && !e.altKey &&
      CONTROL_KEYS.has(e.key)
    )
  }

  function resetSequence () {
    groupIndex = 0
    clearTimeout(timeout)
  }

  function handler (e: KeyboardEvent) {
    // a modifier press must not reset a sequence; Safari sends the IME commit Enter with keyCode 229
    if (e.isComposing || e.keyCode === 229 || ['Control', 'Shift', 'Alt', 'AltGraph', 'Meta'].includes(e.key)) return
    if (e.repeat && isSequence) return

    const group = keyGroups[groupIndex]

    if (!group || isInputFocused(e)) return

    if (!matchesKeyGroup(e, group, isMac)) {
      if (!isSequence) return
      const restart = groupIndex > 0 && matchesKeyGroup(e, keyGroups[0], isMac)
      resetSequence()
      if (!restart) return
    }

    if (toValue(preventDefault)) e.preventDefault()

    if (!isSequence) {
      callback(e)
      return
    }

    clearTimeout(timeout)
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
    clearTimeout(timeout)
  }

  watch(() => toValue(keys), newKeys => {
    cleanup()

    if (newKeys) {
      const parsed = parseKeyCombination(newKeys.toLowerCase())
      if (parsed) {
        const parts = !isString(parsed) && parsed.type === 'sequence'
          ? parsed.parts
          : [parsed]
        isSequence = parts.length > 1
        keyGroups = parts
        resetSequence()
        window.addEventListener(toValue(event), handler)
      }
    }
  }, { immediate: true })

  // Watch for changes in the event type to re-register the listener
  watch(() => toValue(event), (newEvent, oldEvent) => {
    if (oldEvent && keyGroups && keyGroups.length > 0) {
      window.removeEventListener(oldEvent, handler)
      window.addEventListener(newEvent, handler)
    }
  })

  onScopeDispose(cleanup, true)

  return cleanup
}

function matchesKeyGroup (e: KeyboardEvent, group: Exclude<KeyCombination, Sequence>, isMac: boolean): boolean {
  if (!isString(group) && group.type === 'alternate') {
    return group.parts.some(part => matchesKeyGroup(e, part, isMac))
  }

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

function parseKeyGroup (group: Combo | Key): {
  modifiers: Record<Modifier, boolean>
  actualKey: string | undefined
} {
  const parts = isString(group) ? [group] : group.parts
  const modifiers = { ...emptyModifiers }
  let actualKey: string | undefined

  for (const part of parts) {
    if (isModifier(part)) {
      modifiers[part] = true
    } else {
      // TODO: handle multiple keys
      actualKey = part
    }
  }

  return { modifiers, actualKey }
}
