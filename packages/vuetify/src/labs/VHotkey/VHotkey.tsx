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

// Styles
import './VHotkey.scss'

// Components
import { VIcon } from '@/components/VIcon'
import { VKbd } from '@/components/VKbd'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useLocale, useRtl } from '@/composables/locale'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useVariant } from '@/composables/variant'

// Utilities
import { computed } from 'vue'
import { genericComponent, mergeDeep, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { IconValue } from '@/composables/icons'
import type { Variant } from '@/composables/variant'

// Display mode types for different visual representations
type DisplayMode = 'icon' | 'symbol' | 'text'

// Extended variant type that includes our custom 'contained' variant
type HotkeyVariant = 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain' | 'contained'

// Key display tuple: [mode, content] where content is string or IconValue
type KeyDisplay = [Exclude<DisplayMode, 'icon'>, string] | [Extract<DisplayMode, 'icon'>, IconValue]

// Key tuple: [mode, content] where content is string or IconValue
type Key = [Exclude<DisplayMode, 'icon'>, string, string] | [Extract<DisplayMode, 'icon'>, IconValue, string]

// Key mapping function type
type KeyMap = Record<string, (mode: DisplayMode, isMac: boolean) => KeyDisplay>

type KeyConfig = {
  symbol?: string
  icon?: string
  text: string
}

type PlatformKeyConfig = {
  mac?: KeyConfig
  default: KeyConfig
}

function createKey (config: PlatformKeyConfig) {
  return (requestedMode: DisplayMode, isMac: boolean): KeyDisplay => {
    const keyCfg = (isMac && config.mac) ? config.mac : config.default

    // 1. Resolve the safest display mode for the current platform
    const mode: DisplayMode = (() => {
      // Non-Mac platforms rarely use icons – prefer text
      if (requestedMode === 'icon' && !isMac) return 'text'

      // If the requested mode lacks an asset, fall back to text
      if (requestedMode === 'icon' && !keyCfg.icon) return 'text'
      if (requestedMode === 'symbol' && !keyCfg.symbol) return 'text'

      return requestedMode
    })()

    // 2. Pick value for the chosen mode, defaulting to text representation
    let value: string | IconValue = keyCfg[mode] ?? keyCfg.text

    // 3. Guard against icon tokens leaking into text mode (e.g. "$ctrl")
    if (mode === 'text' && typeof value === 'string' && value.startsWith('$') && !value.startsWith('$vuetify.')) {
      value = value.slice(1).toUpperCase() // "$ctrl" → "CTRL"
    }

    return mode === 'icon'
      ? ['icon', value as IconValue]
      : [mode as Exclude<DisplayMode, 'icon'>, value as string]
  }
}

const keyMap: KeyMap = {
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
  shift: createKey({
    mac: { symbol: '⇧', icon: '$shift', text: '$vuetify.hotkey.shift' }, // Shift symbol
    default: { text: 'Shift', icon: '$shift' },
  }),
  alt: createKey({
    mac: { symbol: '⌥', icon: '$alt', text: '$vuetify.hotkey.option' }, // Mac Option symbol
    default: { text: 'Alt', icon: '$alt' },
  }),
  enter: createKey({
    default: { symbol: '↵', icon: '$enter', text: '$vuetify.hotkey.enter' }, // Return symbol
  }),
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
  backspace: createKey({
    default: { symbol: '⌫', icon: '$backspace', text: '$vuetify.hotkey.backspace' }, // Backspace symbol
  }),
  escape: createKey({
    default: { text: '$vuetify.hotkey.escape' },
  }),
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
}

// Create custom variant props that extend the base variant props with our 'contained' option
const makeVHotkeyVariantProps = propsFactory({
  variant: {
    type: String as PropType<HotkeyVariant>,
    default: 'elevated' as const,
    validator: (v: any) => ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain', 'contained'].includes(v),
  },
}, 'VHotkeyVariant')

export const makeVHotkeyProps = propsFactory({
  // String representing keyboard shortcuts (e.g., "ctrl+k", "meta+shift+p")
  keys: String,
  // How to display keys: 'symbol' uses special characters (⌘, ⌃), 'icon' uses SVG icons, 'text' uses words
  displayMode: {
    type: String as PropType<DisplayMode>,
    default: 'icon',
  },
  keyMap: {
    type: Object as PropType<KeyMap>,
    default: keyMap,
  },
  overridePlatform: {
    type: String as PropType<'mac' | string>,
    default: undefined,
  },
  inline: Boolean,
  // Disabled state
  disabled: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
  ...makeBorderProps(),
  ...makeRoundedProps(),
  ...makeElevationProps(),
  // Use our custom variant props instead of the base ones
  ...makeVHotkeyVariantProps(),
  // Still include color from the base variant props
  color: String,
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

function getKeyText (keyMap: KeyMap, key: string, isMac: boolean): string {
  // Normalize keys to lowercase for consistent lookup
  const lowerKey = key.toLowerCase()

  // Check if we have a specific mapping for this key
  if (lowerKey in keyMap) {
    const result = keyMap[lowerKey]('text', isMac)
    return typeof result[1] === 'string' ? result[1] : String(result[1])
  }

  // Fallback to uppercase text for unknown keys
  return key.toUpperCase()
}

function applyDisplayModeToKey (keyMap: KeyMap, mode: DisplayMode, key: string, isMac: boolean): Key {
  // Normalize keys to lowercase for consistent lookup
  const lowerKey = key.toLowerCase()

  // Check if we have a specific mapping for this key
  if (lowerKey in keyMap) {
    const result = keyMap[lowerKey](mode, isMac)

    // If we get an icon token in text mode, convert it to readable text
    if (result[0] === 'text' && typeof result[1] === 'string' && result[1].startsWith('$') && !result[1].startsWith('$vuetify.')) {
      return ['text', result[1].replace('$', '').toUpperCase(), key]
    }

    return [...result, key]
  }

  // Fallback to uppercase text for unknown keys
  return ['text', key.toUpperCase(), key]
}

export const VHotkey = genericComponent()({
  name: 'VHotkey',

  props: makeVHotkeyProps(),

  setup (props) {
    const { t } = useLocale()
    const { themeClasses } = provideTheme(props)
    const { rtlClasses } = useRtl()
    const { borderClasses } = useBorder(props)
    const { roundedClasses } = useRounded(props)
    const { elevationClasses } = useElevation(props)

    // Handle variant logic - use standard variant composable for non-contained variants
    const isContainedVariant = computed(() => props.variant === 'contained')

    // For contained variant, we'll use 'elevated' as the base variant for the wrapper
    const effectiveVariantProps = computed(() => ({
      ...props,
      variant: isContainedVariant.value ? 'elevated' as Variant : props.variant as Variant,
    }))

    const { colorClasses, colorStyles, variantClasses } = useVariant(effectiveVariantProps)

    const isMac = computed(() =>
      props.overridePlatform !== undefined
        ? props.overridePlatform === 'mac'
        : (typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent))
    )

    // The requested display mode remains unchanged; createKey handles platform-specific fallbacks
    const effectiveDisplayMode = computed<DisplayMode>(() => props.displayMode)

    const AND_DELINEATOR = new Delineator('and') // For + separators
    const THEN_DELINEATOR = new Delineator('then') // For - separators

    const _keyMap = computed(() => {
      // Merge the keyMap with the default. Allows the user to selectively overwrite specific key behaviors
      // We will recommend that this property be set at the component default level and not on a per-instance basis
      // TODO: This can be more efficient. Most of the time this will merge IDENTICAL objects needlessly.
      // TODO: (continued) So we could make it so the default for props.keyMap is an empty object,
      // TODO: (continued) but how might that affect doc generation? @MajesticPotatoe do you know? I want good DX!
      return mergeDeep(keyMap, props.keyMap)
    })

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
        if (isMac.value && modifiers.ctrl && !modifiers.meta) {
          modifiers.meta = true
          modifiers.ctrl = false
        }

        // Transform each key part into its display representation
        return parts.map(key => {
          // Return delineator objects as-is for separator rendering
          if (isDelineator(key)) return key
          // Apply the key mapping to get the display representation
          return applyDisplayModeToKey(_keyMap.value, effectiveDisplayMode.value, key, isMac.value)
        })
      })
    })

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
              ? applyDisplayModeToKey(mergeDeep(keyMap, props.keyMap), 'text', String(key[1]), isMac.value)[1]
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

    function getKeyTooltip (key: Key): string | undefined {
      // Only provide tooltips for icon and symbol modes where visual clarity might be needed
      // Check the requested display mode, not the actual rendered mode (which may fall back to text)
      if (effectiveDisplayMode.value === 'text') return undefined

      // Get the text representation for tooltip
      const textKey = getKeyText(_keyMap.value, String(key[2]), isMac.value)
      return translateKey(textKey)
    }

    useRender(() => (
      <div
        class={[
          'v-hotkey',
          {
            'v-hotkey--disabled': props.disabled,
            'v-hotkey--inline': props.inline,
            'v-hotkey--contained': isContainedVariant.value,
          },
          themeClasses.value,
          rtlClasses.value,
          variantClasses.value,
          props.class,
        ]}
        style={ props.style }
        role="img"
        aria-label={ accessibleLabel.value }
      >
        { isContainedVariant.value ? (
          // Contained variant: Wrap everything in a single VKbd with nested kbd elements
          <VKbd
            class={[
              'v-hotkey__contained-wrapper',
              borderClasses.value,
              roundedClasses.value,
              elevationClasses.value,
              colorClasses.value,
            ]}
            style={[
              colorStyles.value,
            ]}
            aria-hidden="true"
          >
            { keyCombinations.value.map((combination, comboIndex) => (
              <span class="v-hotkey__combination" key={ comboIndex }>
                { combination.map((key, keyIndex) => {
                  return isDelineator(key) ? (
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
                      { /* Individual key display - nested kbd elements without visual styling */ }
                      <kbd
                        key={ keyIndex }
                        class={[
                          'v-hotkey__key',
                          `v-hotkey__key-${key[0]}`,
                          'v-hotkey__key--nested',
                        ]}
                        aria-hidden="true"
                        title={ getKeyTooltip(key) }
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
                      </kbd>
                    </>
                  )
                })}
                { comboIndex < keyCombinations.value.length - 1 && <span aria-hidden="true">&nbsp;</span> }
              </span>
            ))}
          </VKbd>
        ) : (
          // Standard variants: Individual VKbd elements
          keyCombinations.value.map((combination, comboIndex) => (
            <span class="v-hotkey__combination" key={ comboIndex }>
              { combination.map((key, keyIndex) => {
                return isDelineator(key) ? (
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
                        `v-hotkey__key-${key[0]}`,
                        borderClasses.value,
                        roundedClasses.value,
                        elevationClasses.value,
                        colorClasses.value,
                      ]}
                      style={[
                        colorStyles.value,
                      ]}
                      aria-hidden="true"
                      title={ getKeyTooltip(key) }
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
                )
              })}
              { comboIndex < keyCombinations.value.length - 1 && <span aria-hidden="true">&nbsp;</span> }
            </span>
          ))
        )}
      </div>
    ))
  },
})

export type VHotkey = InstanceType<typeof VHotkey>
