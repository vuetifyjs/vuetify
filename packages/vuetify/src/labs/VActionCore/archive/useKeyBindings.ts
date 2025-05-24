// Utilities
import { computed, ref, toValue } from 'vue'
import type { MaybeRef } from 'vue'
import { IS_CLIENT, IS_MAC } from './platform'

// Types
/**
 * @file useKeyBindings.ts A Vue composable for defining keyboard hotkeys,
 */

const COMPONENT_NAME = 'useKeyBindings'

// --- Types ---
type Handler = (e?: KeyboardEvent) => void

export interface ShortcutConfig {
  handler: Handler
  usingInput?: string | boolean // string: input name, true: any input, false/undefined: not in input
  preventDefault?: boolean
  stopPropagation?: boolean
  preferEventCode?: boolean  // When true, use event.code instead of event.key for detection (helps with Option/Alt on macOS)
}

export interface KeyBindingConfig {
  [key: string]: ShortcutConfig | Handler | undefined | null | false
}

export interface KeyBindingOptions {
  chainDelay?: number
  target?: MaybeRef<EventTarget | undefined>
  capture?: boolean // Global capture option for the listener
  passive?: boolean // Global passive option for the listener
  preferEventCode?: boolean // Default setting for preferEventCode across all shortcuts
}

interface InternalShortcut {
  handler: Handler
  chained: boolean
  key: string
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  altKey: boolean
  preventDefault: boolean
  stopPropagation: boolean
  usingInput?: string | boolean
  preferEventCode?: boolean
}

// --- Utility Functions ---
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timeoutId: number | undefined
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = IS_CLIENT ? window.setTimeout(() => fn.apply(this, args), delay) : undefined
  } as T
}

function getActiveElement(): HTMLElement | null {
  if (!IS_CLIENT) return null
  return document.activeElement as HTMLElement | null
}

// Key code to normalized key mapping for common keys
// This helps handle different keyboard layouts, especially with Option/Alt combinations
const defaultCodeMap: Record<string, string> = {
  // Letter keys
  'KeyA': 'a', 'KeyB': 'b', 'KeyC': 'c', 'KeyD': 'd', 'KeyE': 'e',
  'KeyF': 'f', 'KeyG': 'g', 'KeyH': 'h', 'KeyI': 'i', 'KeyJ': 'j',
  'KeyK': 'k', 'KeyL': 'l', 'KeyM': 'm', 'KeyN': 'n', 'KeyO': 'o',
  'KeyP': 'p', 'KeyQ': 'q', 'KeyR': 'r', 'KeyS': 's', 'KeyT': 't',
  'KeyU': 'u', 'KeyV': 'v', 'KeyW': 'w', 'KeyX': 'x', 'KeyY': 'y',
  'KeyZ': 'z',

  // Digit keys
  'Digit0': '0', 'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4',
  'Digit5': '5', 'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9',

  // Numpad
  'Numpad0': '0', 'Numpad1': '1', 'Numpad2': '2', 'Numpad3': '3', 'Numpad4': '4',
  'Numpad5': '5', 'Numpad6': '6', 'Numpad7': '7', 'Numpad8': '8', 'Numpad9': '9',

  // Function keys
  'F1': 'f1', 'F2': 'f2', 'F3': 'f3', 'F4': 'f4', 'F5': 'f5',
  'F6': 'f6', 'F7': 'f7', 'F8': 'f8', 'F9': 'f9', 'F10': 'f10',
  'F11': 'f11', 'F12': 'f12',

  // Other common keys
  'Space': ' ', 'Backspace': 'backspace', 'Delete': 'delete',
  'Enter': 'enter', 'Tab': 'tab', 'Escape': 'escape',
  'ArrowLeft': 'arrowleft', 'ArrowRight': 'arrowright',
  'ArrowUp': 'arrowup', 'ArrowDown': 'arrowdown',
  'Home': 'home', 'End': 'end', 'PageUp': 'pageup', 'PageDown': 'pagedown',

  // Modifier keys
  'AltLeft': 'alt', 'AltRight': 'alt',
  'ControlLeft': 'ctrl', 'ControlRight': 'ctrl',
  'ShiftLeft': 'shift', 'ShiftRight': 'shift',
  'MetaLeft': 'meta', 'MetaRight': 'meta',

  // Common symbols
  'Minus': '-', 'Equal': '=', 'BracketLeft': '[', 'BracketRight': ']',
  'Semicolon': ';', 'Quote': "'", 'Backslash': '\\', 'Comma': ',',
  'Period': '.', 'Slash': '/'
}

// --- Core Composable ---
export function useKeyBindings(
  config: MaybeRef<KeyBindingConfig>,
  options: KeyBindingOptions = {}
): () => void {
  const {
    chainDelay = 800,
    target = IS_CLIENT ? window : undefined,
    capture = false, // Default capture to false
    passive = false, // Default passive to false
    preferEventCode = true, // Default to using event.code for better cross-platform compatibility
  } = options

  const chainedInputs = ref<string[]>([])
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length)
  }
  const debouncedClearChainedInput = debounce(clearChainedInput, chainDelay)

  const onKeyDown = (e: KeyboardEvent) => {
    if (!e.key) return

    const eventKeyNormalized = e.key.toLowerCase()
    const eventCodeNormalized = e.code && defaultCodeMap[e.code] ? defaultCodeMap[e.code] : e.code?.toLowerCase()
    const alphabeticalKey = /^[a-z]{1}$/i.test(e.key)

    // Helper to determine if the shortcut should fire given the current active element
    const isShortcutEnabled = (sc: InternalShortcut): boolean => {
      const activeEl = getActiveElement()
      const tagName = activeEl?.tagName
      const elName = activeEl?.getAttribute('name')
      const isEditable = !!(tagName === 'INPUT' || tagName === 'TEXTAREA' || activeEl?.isContentEditable)

      if (sc.usingInput === undefined || sc.usingInput === false) {
        return !isEditable
      }
      if (sc.usingInput === true) {
        return isEditable
      }
      if (typeof sc.usingInput === 'string') {
        return isEditable && elName === sc.usingInput
      }
      return true
    }

    // 1. Chained Key Bindings
    chainedInputs.value.push(eventKeyNormalized)
    if (chainedInputs.value.length >= 2) {
      const chainedKeyString = chainedInputs.value.slice(-2).join('-')
      for (const shortcut of internalKeyBindings.value.filter(s => s.chained)) {
        if (shortcut.key === chainedKeyString && isShortcutEnabled(shortcut)) {
          if (shortcut.preventDefault) e.preventDefault()
          if (shortcut.stopPropagation) e.stopPropagation()
          shortcut.handler(e)
          clearChainedInput()
          return
        }
      }
    }

    // 2. Standard / Combination Key Bindings
    for (const shortcut of internalKeyBindings.value.filter(s => !s.chained)) {
      // Determine which event property to use for matching
      const shouldUseEventCode = shortcut.preferEventCode ?? preferEventCode
      const eventKey = shouldUseEventCode && eventCodeNormalized ? eventCodeNormalized : eventKeyNormalized

      // Special handling for Option+key combinations on macOS
      // When Option is held, e.key often becomes a special character, so we must rely on e.code
      const isOptionKeyCombo = e.altKey && !shortcut.metaKey && !shortcut.ctrlKey && shortcut.altKey
      const effectiveKey = (IS_MAC && isOptionKeyCombo && eventCodeNormalized) ? eventCodeNormalized : eventKey

      if (effectiveKey !== shortcut.key) continue
      if (e.metaKey !== shortcut.metaKey) continue
      if (e.ctrlKey !== shortcut.ctrlKey) continue
      if (e.altKey !== shortcut.altKey) continue
      // Shift check: only for alphabetical keys if shortcut.shiftKey is true,
      // or if non-alphabetical and shortcut.shiftKey is explicitly involved.
      if (alphabeticalKey && e.shiftKey !== shortcut.shiftKey) continue
      if (!alphabeticalKey && shortcut.shiftKey && e.shiftKey !== shortcut.shiftKey) continue

      if (isShortcutEnabled(shortcut)) {
        if (shortcut.preventDefault) e.preventDefault()
        if (shortcut.stopPropagation) e.stopPropagation()
        shortcut.handler(e)
        clearChainedInput()
        return
      }
    }
    debouncedClearChainedInput()
  }

  const internalKeyBindings = computed<InternalShortcut[]>(() => {
    const keyBindingMap = toValue(config)
    return Object.entries(keyBindingMap).map(([key, shortcutConfigValue]) => {
      if (!shortcutConfigValue) return null

      const shortcut: Partial<InternalShortcut> = {}
      let userShortcutConfig: ShortcutConfig

      if (typeof shortcutConfigValue === 'function') {
        shortcut.handler = shortcutConfigValue
        userShortcutConfig = { handler: shortcutConfigValue }
      } else {
        shortcut.handler = shortcutConfigValue.handler
        userShortcutConfig = shortcutConfigValue
      }

      if (!shortcut.handler) {
        console.warn(`[${COMPONENT_NAME}] Invalid handler for shortcut: "${key}"`)
        return null
      }

      shortcut.preventDefault = userShortcutConfig.preventDefault ?? false
      shortcut.stopPropagation = userShortcutConfig.stopPropagation ?? false
      shortcut.preferEventCode = userShortcutConfig.preferEventCode

      const lowerKey = key.toLowerCase()
      shortcut.chained = lowerKey.includes('-') && lowerKey !== '-' && !lowerKey.includes('_') && !lowerKey.includes('+')

      if (shortcut.chained) {
        shortcut.key = lowerKey
        shortcut.metaKey = false
        shortcut.ctrlKey = false
        shortcut.shiftKey = false
        shortcut.altKey = false
      } else {
        const keyParts = lowerKey.split(/[_+]/).map(k => k.trim()).filter(k => k)
        shortcut.key = keyParts.find(k => !['meta', 'command', 'ctrl', 'shift', 'alt', 'option'].includes(k)) || keyParts[keyParts.length -1]

        // Basic aliasing for consistency with common e.key values
        const keyAlias: Record<string, string> = {
          'esc': 'escape', 'cmd': 'meta', 'command': 'meta', 'control': 'ctrl', 'option': 'alt',
          // Add additional aliases as needed for better cross-platform support
        }
        if (shortcut.key && keyAlias[shortcut.key]) shortcut.key = keyAlias[shortcut.key]

        shortcut.metaKey = keyParts.includes('meta') || keyParts.includes('command') || keyParts.includes('cmd')
        shortcut.ctrlKey = keyParts.includes('ctrl') || keyParts.includes('control')
        shortcut.shiftKey = keyParts.includes('shift')
        shortcut.altKey = keyParts.includes('alt') || keyParts.includes('option')

        if (!IS_MAC && shortcut.metaKey && !shortcut.ctrlKey) {
          shortcut.metaKey = false
          shortcut.ctrlKey = true
        }
      }

      if (!shortcut.key) {
        console.warn(`[${COMPONENT_NAME}] Could not parse key for shortcut: "${key}"`);
        return null;
      }

      // Preserve usingInput for per-event evaluation
      shortcut.usingInput = userShortcutConfig.usingInput

      return shortcut as InternalShortcut
    }).filter(Boolean) as InternalShortcut[]
  })

  let removeEventListener: (() => void) | null = null

  const start = () => {
    if (!IS_CLIENT) return
    const eventTargetValue = toValue(target)
    if (!eventTargetValue) {
      console.warn(`[${COMPONENT_NAME}] No target provided for event listener.`)
      return
    }

    const listenerOptions = { capture, passive }
    eventTargetValue.addEventListener('keydown', onKeyDown as EventListener, listenerOptions)
    removeEventListener = () => {
      eventTargetValue.removeEventListener('keydown', onKeyDown as EventListener, listenerOptions)
    }
  }

  const stop = () => {
    if (removeEventListener) {
      removeEventListener()
      removeEventListener = null
    }
    clearTimeout(debouncedClearChainedInput as any)
  }

  start()
  return stop
}
