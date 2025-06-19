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
import { VKbd } from '@/components/VKbd'

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
 * Configuration type for key display across different modes
 */
type KeyConfig = {
  symbol?: string
  icon?: string
  text: string
}

/**
 * Platform-specific key configuration
 */
type PlatformKeyConfig = {
  mac?: KeyConfig
  default: KeyConfig
}

/**
 * Creates a key function from declarative configuration
 * This approach separates platform logic from display mode logic
 */
function createKey (config: PlatformKeyConfig) {
  return (mode: DisplayMode, isMac: boolean): KeyDisplay => {
    const keyConfig = (isMac && config.mac) ? config.mac : config.default
    const value = keyConfig[mode] ?? keyConfig.text

    // If we requested icon mode but no icon is available, fallback to text mode
    if (mode === 'icon' && !keyConfig.icon) {
      return ['text', value]
    }

    // If we requested symbol mode but no symbol is available, fallback to text mode
    if (mode === 'symbol' && !keyConfig.symbol) {
      return ['text', value]
    }

    return mode === 'icon' ? ['icon', value as IconValue] : [mode as Exclude<DisplayMode, 'icon'>, value]
  }
}

/**
 * Comprehensive key mapping using declarative configuration
 * Each key is defined by its platform-specific display options
 */
const keyMap = {
  // Control key (different symbol on Mac)
  ctrl: createKey({
    mac: { symbol: '⌃', icon: '$ctrl', text: '$vuetify.hotkey.ctrl' }, // Mac Control symbol
    default: { text: 'Ctrl', icon: '$ctrl' },
  }),
  // Meta and Cmd both map to Command on Mac, Ctrl on PC
  meta: createKey({
    mac: { symbol: '⌘', icon: '$command', text: '$vuetify.hotkey.command' }, // Mac Command symbol
    default: { text: 'Ctrl', icon: '$ctrl' },
  }),
  cmd: createKey({
    mac: { symbol: '⌘', icon: '$command', text: '$vuetify.hotkey.command' }, // Mac Command symbol
    default: { text: 'Ctrl', icon: '$ctrl' },
  }),
  // Shift key
  shift: createKey({
    mac: { symbol: '⇧', icon: '$shift', text: '$vuetify.hotkey.shift' }, // Shift symbol
    default: { text: 'Shift', icon: '$shift' },
  }),
  // Alt/Option key (different names on Mac vs PC)
  alt: createKey({
    mac: { symbol: '⌥', icon: '$alt', text: '$vuetify.hotkey.option' }, // Mac Option symbol
    default: { text: 'Alt', icon: '$alt' },
  }),
  // Enter/Return key (same across platforms)
  enter: createKey({
    default: { symbol: '↵', icon: '$enter', text: '$vuetify.hotkey.enter' }, // Return symbol
  }),
  // Arrow keys (same across platforms)
  arrowup: createKey({
    default: { symbol: '↑', icon: '$arrowup', text: '$vuetify.hotkey.upArrow' },
  }),
  arrowdown: createKey({
    default: { symbol: '↓', icon: '$arrowdown', text: '$vuetify.hotkey.downArrow' },
  }),
  arrowleft: createKey({
    default: { symbol: '←', icon: '$arrowleft', text: '$vuetify.hotkey.leftArrow' },
  }),
  arrowright: createKey({
    default: { symbol: '→', icon: '$arrowright', text: '$vuetify.hotkey.rightArrow' },
  }),
  // Backspace key (same across platforms)
  backspace: createKey({
    default: { symbol: '⌫', icon: '$backspace', text: '$vuetify.hotkey.backspace' }, // Backspace symbol
  }),
  // Escape key (text only, same across platforms)
  escape: createKey({
    default: { text: '$vuetify.hotkey.escape' },
  }),
  // Minus/Hyphen key (same across platforms)
  '-': createKey({
    default: { symbol: '-', icon: '$minus', text: '-' },
  }),
  // Alternative names for minus key
  minus: createKey({
    default: { symbol: '-', icon: '$minus', text: '-' },
  }),
  hyphen: createKey({
    default: { symbol: '-', icon: '$minus', text: '-' },
  }),
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
              // First, handle explicit "-then-" pattern
              // Replace "-then-" with a special marker that we'll convert to THEN_DELINEATOR
              const THEN_MARKER = '\u0001THEN\u0001' // Use control characters as unlikely markers
              const processedVal = val.replace(/-then-/gi, THEN_MARKER)

              // Handle - separators (THEN delineators) with improved parsing
              // Only treat - as separator when it's between alphanumeric tokens
              // This prevents "shift+-" from being split incorrectly
              const dashSeparatedParts: Array<string | Delineator> = []
              let currentPart = ''

              for (let i = 0; i < processedVal.length; i++) {
                const char = processedVal[i]
                const prevChar = processedVal[i - 1]
                const nextChar = processedVal[i + 1]

                if (char === '-' &&
                    prevChar && /[a-zA-Z0-9]/.test(prevChar) &&
                    nextChar && /[a-zA-Z0-9]/.test(nextChar)) {
                  // This is a separator dash between alphanumeric tokens
                  if (currentPart) {
                    dashSeparatedParts.push(currentPart)
                    currentPart = ''
                  }
                  dashSeparatedParts.push(THEN_DELINEATOR)
                } else {
                  // This is part of a key name (including literal - key)
                  currentPart += char
                }
              }

              // Add the final part if it exists
              if (currentPart) {
                dashSeparatedParts.push(currentPart)
              }

              // Now process the THEN_MARKER tokens
              return dashSeparatedParts.flatMap(part => {
                if (isString(part) && part.includes(THEN_MARKER)) {
                  // Split by THEN_MARKER and insert THEN_DELINEATOR between parts
                  const parts = part.split(THEN_MARKER)
                  const result: Array<string | Delineator> = []

                  for (let i = 0; i < parts.length; i++) {
                    if (parts[i]) { // Only add non-empty parts
                      result.push(parts[i])
                    }
                    // Add THEN_DELINEATOR between parts (but not after the last part)
                    if (i < parts.length - 1) {
                      result.push(THEN_DELINEATOR)
                    }
                  }

                  return result
                }
                return [part]
              })
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
     * Computed property that generates an accessible label for screen readers
     * This creates a human-readable description of the keyboard shortcut
     */
    const accessibleLabel = computed(() => {
      if (!props.keys) return ''

      // Convert the parsed key combinations into readable text
      const readableShortcuts = keyCombinations.value.map(combination => {
        const readableParts: string[] = []

        for (const key of combination) {
          if (isDelineator(key)) {
            if (AND_DELINEATOR.isEqual(key)) {
              readableParts.push(t('$vuetify.hotkey.plus'))
            } else if (THEN_DELINEATOR.isEqual(key)) {
              readableParts.push(t('$vuetify.hotkey.then'))
            }
          } else {
            // Always use text representation for screen readers
            const textKey = key[0] === 'icon' || key[0] === 'symbol'
              ? applyDisplayModeToKey(mergeDeep(keyMap, props.keyMap), 'text', String(key[1]), isMac)[1]
              : key[1]
            readableParts.push(translateKey(textKey as string))
          }
        }

        return readableParts.join(' ')
      })

      const shortcutText = readableShortcuts.join(', ')
      return t('$vuetify.hotkey.shortcut', shortcutText)
    })

    function translateKey (key: string) {
      return key.startsWith('$vuetify.') ? t(key) : key
    }

    /**
     * Render function that creates the visual representation of the keyboard shortcuts
     * Structure:
     * - Container div with v-hotkey class and accessibility attributes
     * - Each key combination gets a span with v-hotkey__combination class
     * - Each individual key gets wrapped in a <kbd> element with v-hotkey__key class
     * - Keys within a combination are separated by '+' dividers
     * - Multiple combinations are separated by spaces
     */
    useRender(() => (
      <div
        class="v-hotkey"
        role="img"
        aria-label={ accessibleLabel.value }
      >
        { keyCombinations.value.map((combination, comboIndex) => (
          <span class="v-hotkey__combination" key={ comboIndex }>
            { combination.map((key, keyIndex) => (
              <>
                { isDelineator(key) ? (
                  <>
                    { /* Render + separator for AND delineators */ }
                    { AND_DELINEATOR.isEqual(key) && (
                      <span
                        key={ keyIndex }
                        class="v-hotkey__divider"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    )}
                    { /* Render "then" text for THEN delineators */ }
                    {
                      THEN_DELINEATOR.isEqual(key) && (
                      <span
                        key={ keyIndex }
                        class="v-hotkey__divider"
                        aria-hidden="true"
                      >
                        { t('$vuetify.hotkey.then') }
                      </span>
                      )}
                  </>
                ) : (
                  <>
                    { /* Individual key display */ }
                    <VKbd
                      key={ keyIndex }
                      class={[
                        'v-hotkey__key',
                        key[0] === 'icon' ? 'v-hotkey__key-icon' : `v-hotkey__key-${key[0]}`,
                      ]}
                      aria-hidden="true"
                    >
                      { /* Render icon or text based on the key display type */ }
                      {
                        key[0] === 'icon' ? (
                          <VIcon
                            icon={ key[1] }
                            aria-hidden="true"
                          />
                        ) : translateKey(key[1])
                      }
                    </VKbd>
                  </>
                )}
              </>
            ))}
            { /* Add space between different key combinations, but not after the last combination */ }
            { comboIndex < keyCombinations.value.length - 1 && <span aria-hidden="true">&nbsp;</span> }
          </span>
        ))}
      </div>
    ))
  },
})

export type VHotkey = InstanceType<typeof VHotkey>
