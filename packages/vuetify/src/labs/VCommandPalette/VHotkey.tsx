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

type DisplayMode = 'icon' | 'symbol' | 'text'

type KeyDisplay = [Exclude<DisplayMode, 'icon'>, string] | [Extract<DisplayMode, 'icon'>, IconValue]
type KeyMap = Record<string, (mode: DisplayMode, isMac: boolean) => KeyDisplay>

function cmdAndMeta (mode: DisplayMode, isMac: boolean): KeyDisplay {
  switch (mode) {
    case 'symbol':
      if (isMac) return ['symbol', '⌘']
    case 'icon':
      // eslint-disable-next-line max-len
      if (isMac) return ['icon', ['M6 2a4 4 0 0 1 4 4v2h4V6a4 4 0 0 1 4-4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v4h2a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4v-2h-4v2a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4h2v-4H6a4 4 0 0 1-4-4a4 4 0 0 1 4-4m10 16a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2zm-2-8h-4v4h4zm-8 6a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2v-2zM8 6a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2h2zm10 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2z']]
    default:
      return ['text', isMac ? 'Command' : 'Ctrl']
  }
}

const keyMap = {
  ctrl (mode, isMac) {
    switch (mode) {
      case 'symbol':
        if (isMac) return ['symbol', '⌃']
      case 'icon':
        if (isMac) return ['icon', ['m19.78 11.78l-1.42 1.41L12 6.83l-6.36 6.36l-1.42-1.41L12 4z']]
      default:
        return ['text', 'Ctrl']
    }
  },
  meta: cmdAndMeta,
  cmd: cmdAndMeta,
  shift (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '⇧']
      case 'icon':
        return ['icon', ['M15 18v-6h2.17L12 6.83L6.83 12H9v6zM12 4l10 10h-5v6H7v-6H2z']]
      default:
        return ['text', 'Shift']
    }
  },
  alt (mode, isMac) {
    switch (mode) {
      case 'symbol':
        if (isMac) return ['symbol', '⌥']
      case 'icon':
        return ['icon', ['M3 4h6.11l7.04 14H21v2h-6.12L7.84 6H3zm11 0h7v2h-7z']]
      default:
        return ['text', isMac ? 'Option' : 'Alt']
    }
  },
  enter (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '↵']
      case 'icon':
        return ['icon', ['M19 7v4H5.83l3.58-3.59L8 6l-6 6l6 6l1.41-1.42L5.83 13H21V7z']]
      default:
        return ['text', 'Enter']
    }
  },
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
  backspace (mode) {
    switch (mode) {
      case 'symbol':
        return ['symbol', '⌫']
      case 'icon':
        // eslint-disable-next-line max-len
        return ['icon', ['M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12zM22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3zm0 2H7l-4.72 7L7 19h15z']]
      default:
        return ['text', 'Backspace']
    }
  },
  escape () {
    return ['text', 'Esc']
  },
} as const satisfies KeyMap

/**
 * Props factory for VHotkey component
 * @param keys - String representing keyboard shortcuts (e.g., "ctrl+k", "meta+shift+p")
 * @param displayMode - How to display keys: 'symbol' uses special characters (⌘, ⌃), 'text' uses words
 */
export const makeVHotkeyProps = propsFactory({
  keys: String,
  displayMode: {
    type: String as PropType<DisplayMode>,
    default: 'icon',
  },
  keyMap: {
    type: Object as PropType<KeyMap>,
    default: keyMap,
  },
}, 'VHotkey')

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

function isDelineator (value: any): value is Delineator {
  return value instanceof Delineator
}
function isString (value: any): value is string {
  return typeof value === 'string'
}

function applyDisplayModeToKey (keyMap: KeyMap, mode: DisplayMode, key: string, isMac: boolean): KeyDisplay {
  // normalize keys
  const lowerKey = key.toLowerCase()

  if (key in keyMap) {
    return keyMap[lowerKey](mode, isMac)
  }

  return ['text', key.toUpperCase()]
}

export const VHotkey = genericComponent()({
  name: 'VHotkey',

  props: makeVHotkeyProps(),

  setup (props) {
    const { t } = useLocale()

    // Detect if user is on Mac for platform-specific key handling
    const isMac = typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)

    const AND_DELINEATOR = new Delineator('and')
    const THEN_DELINEATOR = new Delineator('then')

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
              return [...acu, AND_DELINEATOR, cv]
            }
            return [...acu, cv]
          }, [])
          .flatMap(val => {
            if (isString(val)) {
              return val.split('-').reduce<Array<string | Delineator>>((acu, cv, index) => {
                if (index !== 0) {
                  return [...acu, THEN_DELINEATOR, cv]
                }
                return [...acu, cv]
              }, [])
            }
            return [val]
          })

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
          // return symbols
          if (isDelineator(key)) return key
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
                    { AND_DELINEATOR.isEqual(key) && <span key={ keyIndex } class="v-hotkey__divider">+</span> }
                    {
                      THEN_DELINEATOR.isEqual(key) &&
                      <span key={ keyIndex } class="v-hotkey__divider">{ t('$vuetify.command.then') }</span>
                    }
                  </>
              ) : (
                  <>
                    { /* Individual key display */ }
                    <kbd key={ keyIndex } class={['v-hotkey__key', key[0] === 'icon' ? 'v-hotkey__key-icon' : `v-hotkey__key-${key[0]}`]}>
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
