// Utilities
import { onBeforeUnmount, shallowRef, toValue, watchEffect } from 'vue'
import { getCurrentInstance } from '@/util/getCurrentInstance'

// Types
import type { MaybeRef } from '@/util'

/**
 * Configuration options for the useHotkey composable
 */
interface HotkeyOptions {
  /** Which keyboard event to listen to. Defaults to 'keydown' */
  event?: 'keydown' | 'keyup'
  /** Whether to trigger hotkeys when focused on input elements. Defaults to false */
  inputs?: boolean
  /** Whether to prevent the default browser behavior when hotkey is triggered. Defaults to true */
  preventDefault?: boolean
  /** Timeout in milliseconds for key sequences (e.g., 'ctrl+k-p'). Defaults to 1000ms */
  sequenceTimeout?: number
}

/**
 * A Vue composable for handling keyboard shortcuts and hotkeys.
 *
 * Supports:
 * - Single key combinations (e.g., 'ctrl+s', 'alt+f4')
 * - Key sequences (e.g., 'ctrl+k-p' means press ctrl+k, then p)
 * - Platform-specific modifiers (cmd on Mac becomes meta key)
 * - Input element filtering (can ignore hotkeys when typing in inputs)
 *
 * @param keys - Reactive string describing the hotkey(s). Can be undefined to disable.
 * @param callback - Function to call when the hotkey is triggered
 * @param options - Additional configuration options
 * @returns Cleanup function to manually remove event listeners
 *
 * @example
 * ```ts
 * // Simple hotkey
 * useHotkey('ctrl+s', () => console.log('Save!'))
 *
 * // Key sequence
 * useHotkey('ctrl+k-p', () => console.log('Command palette!'))
 *
 * // With options
 * useHotkey('enter', handleSubmit, { inputs: true, preventDefault: false })
 *
 * // Reactive hotkey
 * const hotkey = ref('ctrl+s')
 * useHotkey(hotkey, handleSave)
 * ```
 */
export function useHotkey (
  keys: MaybeRef<string | undefined>,
  callback: (e: KeyboardEvent) => void,
  options: HotkeyOptions = {}
) {
  // Extract options with defaults
  const {
    event = 'keydown',
    inputs = false,
    preventDefault = true,
    sequenceTimeout = 1000,
  } = options

  // Get Vue instance for cleanup on unmount
  const vm = getCurrentInstance('useHotkey')

  // Detect if we're on macOS for platform-specific key handling
  const isMac = typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)

  // Timer for handling key sequence timeouts
  const timer = shallowRef<ReturnType<typeof setTimeout>>()

  // Array of key groups for sequences (e.g., ['ctrl+k', 'p'] for 'ctrl+k-p')
  const keyGroups = shallowRef<string[]>([])

  // Whether the current hotkey is a sequence or single combination
  const isSequence = shallowRef(false)

  // Current position in the key sequence (0-based index)
  const groupIndex = shallowRef(0)

  /**
   * Main keyboard event handler that processes key presses and determines
   * if they match the configured hotkey pattern.
   */
  const handler = (e: KeyboardEvent) => {
    // Get the current key group we're expecting (for sequences)
    const currentGroup = keyGroups.value[groupIndex.value]
    if (!currentGroup) return

    // Skip hotkey processing when focused on input elements (unless inputs option is true)
    if (!inputs) {
      const activeElement = document.activeElement as HTMLElement
      if (activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
      )) return
    }

    // Check if the current key press matches the expected key group
    if (matchesKeyGroup(e, currentGroup)) {
      // Prevent default browser behavior if requested
      if (preventDefault) e.preventDefault()

      // Handle key sequences vs single key combinations
      if (isSequence.value) {
        // Clear any existing timeout from previous key in sequence
        if (timer.value) window.clearTimeout(timer.value)

        // Move to next key in sequence
        groupIndex.value++

        // Check if we've completed the entire sequence
        if (groupIndex.value === keyGroups.value.length) {
          // Sequence complete - trigger callback and reset
          callback(e)
          groupIndex.value = 0
        } else {
          // Sequence not complete - set timeout to reset if next key isn't pressed
          timer.value = setTimeout(() => {
            groupIndex.value = 0
          }, sequenceTimeout)
        }
      } else {
        // Single key combination - trigger immediately
        callback(e)
      }
    } else if (isSequence.value) {
      // Key didn't match and we're in a sequence - reset sequence state
      groupIndex.value = 0
      if (timer.value) window.clearTimeout(timer.value)
    }
  }

  /**
   * Cleanup function to remove event listeners and clear timers
   */
  const cleanup = () => {
    window.removeEventListener(event, handler)
    if (timer.value) window.clearTimeout(timer.value)
  }

  // Watch for changes to the keys and update event listeners accordingly
  watchEffect(() => {
    const unrefKeys = toValue(keys)
    if (unrefKeys) {
      // Determine if this is a key sequence (contains '-' separator)
      isSequence.value = unrefKeys.includes('-')

      // Parse keys into groups (split by '-' for sequences, single group for combinations)
      keyGroups.value = isSequence.value ? unrefKeys.toLowerCase().split('-') : [unrefKeys.toLowerCase()]

      // Register the event listener
      window.addEventListener(event, handler)
    } else {
      // No keys specified - cleanup existing listeners
      cleanup()
    }
  })

  // Automatically cleanup when the Vue component unmounts
  if (vm) {
    onBeforeUnmount(cleanup)
  }

  /**
   * Parses a key group string (e.g., 'ctrl+s') into its constituent parts.
   *
   * @param group - Key group string like 'ctrl+s', 'alt+shift+f4', etc.
   * @returns Object containing modifier flags and the actual key
   *
   * @example
   * parseKeyGroup('ctrl+s') // { modifiers: { ctrl: true, ... }, actualKey: 's' }
   * parseKeyGroup('alt+shift+f4') // { modifiers: { alt: true, shift: true, ... }, actualKey: 'f4' }
   */
  function parseKeyGroup (group: string) {
    // Split on + or _ to get individual parts
    const parts = group.split(/[+_]/)

    // Check which modifiers are present
    const modifiers = {
      ctrl: parts.includes('ctrl'),
      shift: parts.includes('shift'),
      alt: parts.includes('alt'),
      meta: parts.includes('meta'),
      cmd: parts.includes('cmd'),
    }

    // Find the actual key (non-modifier part)
    const actualKey = parts.find(part => !['ctrl', 'shift', 'alt', 'meta', 'cmd'].includes(part))

    return { modifiers, actualKey }
  }

  /**
   * Determines the expected modifier key states based on platform and parsed modifiers.
   * Handles the complexity of Mac vs PC key mapping in one place.
   *
   * @param modifiers - Parsed modifier flags from the key group
   * @returns Expected modifier states for comparison with KeyboardEvent
   */
  function getExpectedModifiers (modifiers: ReturnType<typeof parseKeyGroup>['modifiers']) {
    // On Mac, handle special cases for cmd/ctrl mapping
    // eslint-disable-next-line sonarjs/no-collapsible-if
    if (isMac) {
      // 'cmd+s' -> use metaKey (cmd key on Mac)
      if (modifiers.cmd) {
        return {
          ctrl: false,
          meta: true,
          shift: modifiers.shift,
          alt: modifiers.alt,
        }
      }
    }

    // Default case: use modifiers as specified
    // This handles PC, or Mac with explicit meta usage
    return {
      ctrl: modifiers.ctrl,
      meta: modifiers.meta,
      shift: modifiers.shift,
      alt: modifiers.alt,
    }
  }

  /**
   * Checks if a keyboard event matches a specific key group pattern.
   *
   * @param e - The keyboard event to check
   * @param group - The key group string to match against (e.g., 'ctrl+s', 'cmd+k')
   * @returns True if the event matches the key group
   *
   * @example
   * matchesKeyGroup(event, 'ctrl+s') // true if ctrl+s was pressed (or cmd+s on Mac)
   * matchesKeyGroup(event, 'cmd+s') // true if cmd+s on Mac or ctrl+s on PC
   */
  function matchesKeyGroup (e: KeyboardEvent, group: string) {
    const { modifiers, actualKey } = parseKeyGroup(group)
    const expected = getExpectedModifiers(modifiers)

    // Simple comparison: all modifiers and the key must match
    return (
      e.ctrlKey === expected.ctrl &&
      e.metaKey === expected.meta &&
      e.shiftKey === expected.shift &&
      e.altKey === expected.alt &&
      e.key.toLowerCase() === actualKey
    )
  }

  return cleanup
}
