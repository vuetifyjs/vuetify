/**
 * VHotkey Component
 *
 * Purpose: Renders keyboard shortcuts in a visually consistent and accessible way.
 * This component handles the complex logic of displaying keyboard combinations
 * across different platforms (Mac vs PC) and display modes (icons, symbols, text).
 *
 * Why it exists:
 * - Provides consistent visual representation of keyboard shortcuts
 * - Handles platform-specific key differences (Cmd vs Ctrl, Option vs Alt)
 * - Supports multiple display modes for different design needs
 * - Encapsulates complex key parsing and rendering logic
 * - Used throughout the command palette for instruction display
 */

/* eslint-disable no-fallthrough */
// Styles
import './VHotkey.scss'

// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import { genericComponent, mergeDeep, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { IconValue } from '@/composables/icons'

// Display mode types for different visual representations
type DisplayMode = 'icon' | 'symbol' | 'text'

// Key display tuple: [mode, content] where content is string or IconValue
type KeyDisplay = [Exclude<DisplayMode, 'icon'>, string] | [Extract<DisplayMode, 'icon'>, IconValue]

// Key mapping function type
type KeyMap = Record<string, (mode: DisplayMode, isMac: boolean) => KeyDisplay>

/**
 * Helper function for Cmd/Meta key display across platforms
 * Handles the complex logic of showing Command key on Mac vs Ctrl on PC
 */
function cmdAndMeta (mode: DisplayMode, isMac: boolean): KeyDisplay {
  switch (mode) {
    case 'symbol':
      if (isMac) return ['symbol', '⌘'] // Mac Command symbol
    case 'icon':
      // Command key icon (Mac-specific design)
      if (isMac) {
        return ['icon', [
          // eslint-disable-next-line max-len
          'M6 2a4 4 0 0 1 4 4v2h4V6a4 4 0 0 1 4-4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v4h2a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4v-2h-4v2a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4h2v-4H6a4 4 0 0 1-4-4a4 4 0 0 1 4-4m10 16a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2zm-2-8h-4v4h4zm-8 6a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2v-2zM8 6a2 2 0 0 0-2-2a2 2 0 0 0-2 6a2 2 0 0 0 2 2h2zm10 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2z',
        ]]
      }
    default:
      // Text fallback
      return ['text', isMac ? 'Command' : 'Ctrl']
  }
}

/**
 * Comprehensive key mapping for different modifier and special keys
 * Each key function returns the appropriate display based on mode and platform
 */
const keyMap = {
  // Control key (different symbol on Mac)
  ctrl (mode, isMac) {
    switch (mode) {
      case 'symbol':
        if (isMac) return ['symbol', '⌃'] // Mac Control symbol
      case 'icon':
        if (isMac) return ['icon', ['m19.78 11.78l-1.42 1.41L12 6.83l-6.36 6.36l-1.42-1.41L12 4z']]
      default:
        return ['text', 'Ctrl']
    }
  },
  // Meta and Cmd both use the same logic
  meta: cmdAndMeta,
  cmd: cmdAndMeta,
  // Shift key
  shift (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '⇧'] // Shift symbol
      case 'icon':
        return ['icon', ['M15 18v-6h2.17L12 6.83L6.83 12H9v6zM12 4l10 10h-5v6H7v-6H2z']]
      default:
        return ['text', 'Shift']
    }
  },
  // Alt/Option key (different names on Mac vs PC)
  alt (mode, isMac) {
    switch (mode) {
      case 'symbol':
        if (isMac) return ['symbol', '⌥'] // Mac Option symbol
      case 'icon':
        return ['icon', ['M3 4h6.11l7.04 14H21v2h-6.12L7.84 6H3zm11 0h7v2h-7z']]
      default:
        return ['text', isMac ? 'Option' : 'Alt']
    }
  },
  // Enter/Return key
  enter (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '↵'] // Return symbol
      case 'icon':
        return ['icon', ['M19 7v4H5.83l3.58-3.59L8 6l-6 6l6 6l1.41-1.42L5.83 13H21V7z']]
      default:
        return ['text', 'Enter']
    }
  },
  // Arrow keys
  arrowup (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '↑']
      case 'icon':
        return ['icon', ['M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z']]
      default:
        return ['text', 'Up Arrow']
    }
  },
  arrowdown (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '↓']
      case 'icon':
        return ['icon', ['M11 4h2v12l5.5-5.5l1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5L11 16z']]
      default:
        return ['text', 'Down Arrow']
    }
  },
  arrowleft (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '←']
      case 'icon':
        return ['icon', ['M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11z']]
      default:
        return ['text', 'Left Arrow']
    }
  },
  arrowright (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '→']
      case 'icon':
        return ['icon', ['M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z']]
      default:
        return ['text', 'Right Arrow']
    }
  },
  // Backspace key
  backspace (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '⌫'] // Backspace symbol
      case 'icon':
        // Complex backspace icon path
        // eslint-disable-next-line max-len
        return ['icon', ['M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12zM22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3zm0 2H7l-4.72 7L7 19h15z']]
      default:
        return ['text', 'Backspace']
    }
  },
  // Escape key (simple text only)
  escape () {
    return ['text', 'Esc']
  },
} as const satisfies KeyMap

/**
 * Props factory for VHotkey component
 */
export const makeVHotkeyProps = propsFactory({
  // String representing keyboard shortcuts (e.g., "ctrl+k", "meta+shift+p")
  keys: String,
  // How to display keys: 'symbol' uses special characters (⌘, ⌃), 'icon' uses SVG icons, 'text' uses words
  displayMode: {
    type: String as PropType<DisplayMode>,
    default: 'icon',
  },
  // Custom key mapping (allows overriding default key representations)
  keyMap: {
    type: Object as PropType<KeyMap>,
    default: keyMap,
  },
}, 'VHotkey')

/**
 * Delineator class for handling key combination separators
 * Distinguishes between 'and' (+) and 'then' (-) relationships
 */
class Delineator {
  val
  constructor (delineator: string) {
    if (['and', 'then'].includes(delineator)) this.val = delineator as 'then' | 'and'
    else { throw new Error('Not a valid delineator') }
  }

  public isEqual (d: Delineator) {
    return this.val === d.val
  }
}

// Type guards for parsing logic
function isDelineator (value: any): value is Delineator {
  return value instanceof Delineator
}
function isString (value: any): value is string {
  return typeof value === 'string'
}

/**
 * Applies the appropriate display mode to a key based on the key map
 * Handles platform-specific differences and fallbacks
 */
function applyDisplayModeToKey (keyMap: KeyMap, mode: DisplayMode, key: string, isMac: boolean): KeyDisplay {
  // Normalize keys to lowercase for consistent lookup
  const lowerKey = key.toLowerCase()

  // Check if we have a specific mapping for this key
  if (lowerKey in keyMap) {
    return keyMap[lowerKey](mode, isMac)
  }

  // Fallback to uppercase text for unknown keys
  return ['text', key.toUpperCase()]
}

/**
 * VHotkey Component
 *
 * Renders keyboard shortcuts with proper styling and platform awareness.
 * Handles complex parsing of key combination strings and renders them
 * appropriately based on the display mode and platform.
 */
export const VHotkey = genericComponent()({
  name: 'VHotkey',

  props: makeVHotkeyProps(),

  setup (props) {
    const { t } = useLocale()

    // Detect if user is on Mac for platform-specific key handling
    const isMac = typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)

    // Delineator instances for key combination parsing
    const AND_DELINEATOR = new Delineator('and') // For + separators
    const THEN_DELINEATOR = new Delineator('then') // For - separators

    /**
     * Main computed property that parses the keys string and converts it into
     * a structured format for rendering. Handles multiple key combinations
     * separated by spaces (e.g., "ctrl+k meta+p" becomes two separate combinations)
     */
    const keyCombinations = computed(() => {
      if (!props.keys) return []

      // Split by spaces to handle multiple key combinations
      // Example: "ctrl+k meta+p" -> ["ctrl+k", "meta+p"]
      return props.keys.split(' ').map(combination => {
        // Split each combination by + or _ to get individual key parts
        // Example: "ctrl+k" -> ["ctrl", "k"]
        const parts = combination
          .split(/_|\+/)
          .reduce<Array<string | Delineator>>((acu, cv, index) => {
            if (index !== 0) {
              // Add AND delineator between keys joined by + or _
              return [...acu, AND_DELINEATOR, cv]
            }
            return [...acu, cv]
          }, [])
          .flatMap(val => {
            if (isString(val)) {
              // Handle - separators (THEN delineators)
              return val.split('-').reduce<Array<string | Delineator>>((acu, cv, index) => {
                if (index !== 0) {
                  return [...acu, THEN_DELINEATOR, cv]
                }
                return [...acu, cv]
              }, [])
            }
            return [val]
          })

        // Extract just the key strings for modifier detection
        const keys = parts.filter(val => isString(val))

        // Parse modifier keys from the parts array
        const modifiers = {
          meta: keys.some(p => ['meta', 'cmd'].includes(p.toLowerCase())),
          ctrl: keys.some(p => p.toLowerCase() === 'ctrl'),
          alt: keys.some(p => p.toLowerCase() === 'alt'),
          shift: keys.some(p => p.toLowerCase() === 'shift'),
        }

        // Mac-specific logic: Convert ctrl to meta (cmd key) on Mac
        // unless meta is already explicitly specified
        if (isMac && modifiers.ctrl && !modifiers.meta) {
          modifiers.meta = true
          modifiers.ctrl = false
        }

        // Merge the keyMap with the default. Allows the user to selectively overwrite specific key behaviors
        // We will recommend that this property be set at the component default level and not on a per-instance basis
        // TODO: This can be more efficient. Most of the time this will merge IDENTICAL objects needlessly.
        // TODO: (continued) So we could make it so the default for props.keyMap is an empty object,
        // TODO: (continued) but how might that affect doc generation? @MajesticPotatoe do you know? I want good DX!
        const _keyMap = mergeDeep(keyMap, props.keyMap)

        // Transform each key part into its display representation
        return parts.map(key => {
          // Return delineator objects as-is for separator rendering
          if (isDelineator(key)) return key
          // Apply the key mapping to get the display representation
          return applyDisplayModeToKey(_keyMap, props.displayMode, key, isMac)
        })
      })
    })

    /**
     * Render function that creates the visual representation of the keyboard shortcuts
     * Structure:
     * - Container div with v-hotkey class
     * - Each key combination gets a span with v-hotkey__combination class
     * - Each individual key gets wrapped in a <kbd> element with v-hotkey__key class
     * - Keys within a combination are separated by '+' dividers
     * - Multiple combinations are separated by spaces
     */
    useRender(() => (
      <div class="v-hotkey">
        { keyCombinations.value.map((combination, comboIndex) => (
          <span class="v-hotkey__combination" key={ comboIndex }>
            { combination.map((key, keyIndex) => (
              <>
              { isDelineator(key) ? (
                  <>
                    { /* Render + separator for AND delineators */ }
                    { AND_DELINEATOR.isEqual(key) && <span key={ keyIndex } class="v-hotkey__divider">+</span> }
                    { /* Render "then" text for THEN delineators */ }
                    {
                      THEN_DELINEATOR.isEqual(key) &&
                      <span key={ keyIndex } class="v-hotkey__divider">{ t('$vuetify.command.then') }</span>
                    }
                  </>
              ) : (
                  <>
                    { /* Individual key display */ }
                    <kbd key={ keyIndex } class={['v-hotkey__key', key[0] === 'icon' ? 'v-hotkey__key-icon' : `v-hotkey__key-${key[0]}`]}>
                      { /* Render icon or text based on the key display type */ }
                      {
                        key[0] === 'icon' ? <VIcon icon={ key[1] } /> : key[1]
                      }
                    </kbd>
                  </>
              )}
              </>
            ))}
            { /* Add space between different key combinations, but not after the last combination */ }
            { comboIndex < keyCombinations.value.length - 1 && <span>&nbsp;</span> }
          </span>
        ))}
      </div>
    ))
  },
})

export type VHotkey = InstanceType<typeof VHotkey>
