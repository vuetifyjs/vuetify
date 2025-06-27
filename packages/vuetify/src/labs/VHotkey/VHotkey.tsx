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
 *
 * Key Mapping Structure:
 * The keyMap uses a simple object structure where each key has:
 * - `default`: Required configuration for all platforms
 * - `mac`: Optional Mac-specific overrides
 * Each config can specify `symbol`, `icon`, and `text` representations.
 *
 * Example:
 * ```
 * ctrl: {
 *   mac: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
 *   default: { text: 'Ctrl', icon: '$ctrl' }
 * }
 * ```
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
import { splitKeyCombination, splitKeySequence } from '@/composables/hotkey/hotkey-parsing'
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

type KeyConfig = {
  symbol?: string
  icon?: string
  text: string
}

type PlatformKeyConfig = {
  mac?: KeyConfig
  default: KeyConfig
}

type KeyMapConfig = Record<string, PlatformKeyConfig>

function processKey (config: PlatformKeyConfig, requestedMode: DisplayMode, isMac: boolean): KeyDisplay {
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

export const hotkeyMap: KeyMapConfig = {
  ctrl: {
    mac: { symbol: '⌃', icon: '$ctrl', text: '$vuetify.hotkey.ctrl' },
    default: { text: 'Ctrl' },
  },
  meta: {
    mac: { symbol: '⌘', icon: '$command', text: '$vuetify.hotkey.command' },
    default: { text: 'Ctrl' },
  },
  cmd: {
    mac: { symbol: '⌘', icon: '$command', text: '$vuetify.hotkey.command' },
    default: { text: 'Ctrl' },
  },
  shift: {
    mac: { symbol: '⇧', icon: '$shift', text: '$vuetify.hotkey.shift' },
    default: { text: 'Shift' },
  },
  alt: {
    mac: { symbol: '⌥', icon: '$alt', text: '$vuetify.hotkey.option' },
    default: { text: 'Alt' },
  },
  enter: {
    default: { symbol: '↵', icon: '$enter', text: '$vuetify.hotkey.enter' },
  },
  arrowup: {
    default: { symbol: '↑', icon: '$arrowup', text: '$vuetify.hotkey.upArrow' },
  },
  arrowdown: {
    default: { symbol: '↓', icon: '$arrowdown', text: '$vuetify.hotkey.downArrow' },
  },
  arrowleft: {
    default: { symbol: '←', icon: '$arrowleft', text: '$vuetify.hotkey.leftArrow' },
  },
  arrowright: {
    default: { symbol: '→', icon: '$arrowright', text: '$vuetify.hotkey.rightArrow' },
  },
  backspace: {
    default: { symbol: '⌫', icon: '$backspace', text: '$vuetify.hotkey.backspace' },
  },
  escape: {
    default: { text: '$vuetify.hotkey.escape' },
  },
  ' ': {
    mac: { symbol: '␣', icon: '$space', text: '$vuetify.hotkey.space' },
    default: { text: '$vuetify.hotkey.space' },
  },
  '-': {
    default: { text: '-' },
  },
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
  // Custom key mapping configuration. Users can import and modify the exported hotkeyMap as needed
  keyMap: {
    type: Object as PropType<KeyMapConfig>,
    default: () => hotkeyMap,
  },
  platform: {
    type: String as PropType<'auto' | 'pc' | 'mac'>,
    default: 'auto',
  },
  inline: Boolean,
  disabled: Boolean,
  prefix: String,
  suffix: String,

  ...makeComponentProps(),
  ...makeThemeProps(),
  ...makeBorderProps(),
  ...makeRoundedProps(),
  ...makeElevationProps(),
  ...makeVHotkeyVariantProps(),
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

function getKeyText (keyMap: KeyMapConfig, key: string, isMac: boolean): string {
  const lowerKey = key.toLowerCase()

  if (lowerKey in keyMap) {
    const result = processKey(keyMap[lowerKey], 'text', isMac)
    return typeof result[1] === 'string' ? result[1] : String(result[1])
  }

  return key.toUpperCase()
}

function applyDisplayModeToKey (keyMap: KeyMapConfig, mode: DisplayMode, key: string, isMac: boolean): Key {
  const lowerKey = key.toLowerCase()

  if (lowerKey in keyMap) {
    const result = processKey(keyMap[lowerKey], mode, isMac)

    if (result[0] === 'text' && typeof result[1] === 'string' && result[1].startsWith('$') && !result[1].startsWith('$vuetify.')) {
      return ['text', result[1].replace('$', '').toUpperCase(), key]
    }

    return [...result, key]
  }

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

    const isContainedVariant = computed(() => props.variant === 'contained')

    const effectiveVariantProps = computed(() => ({
      ...props,
      variant: isContainedVariant.value ? 'elevated' as Variant : props.variant as Variant,
    }))

    const { colorClasses, colorStyles, variantClasses } = useVariant(effectiveVariantProps)

    const isMac = computed(() =>
      props.platform === 'auto'
        ? (typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent))
        : props.platform === 'mac'
    )

    const effectiveDisplayMode = computed<DisplayMode>(() => props.displayMode)

    const AND_DELINEATOR = new Delineator('and') // For + separators
    const THEN_DELINEATOR = new Delineator('then') // For - separators

    const effectiveKeyMap = computed(() => props.keyMap)

    const keyCombinations = computed(() => {
      if (!props.keys) return []

      // Split by spaces to handle multiple key combinations
      // Example: "ctrl+k meta+p" -> ["ctrl+k", "meta+p"]
      return props.keys.split(' ').map(combination => {
        // Use the shared sequence splitting logic
        const sequenceGroups = splitKeySequence(combination)

        // Process each sequence group
        return sequenceGroups.flatMap((group, groupIndex) => {
          // Use the shared key combination splitting logic
          const keyParts = splitKeyCombination(group)

          const parts = keyParts.reduce<Array<string | Delineator>>((acc, part, index) => {
            if (index !== 0) {
              // Add AND delineator between keys
              return [...acc, AND_DELINEATOR, part]
            }
            return [...acc, part]
          }, [])

          // Add THEN delineator between sequence groups
          const result = parts.map(key => {
            if (isString(key)) {
              return applyDisplayModeToKey(effectiveKeyMap.value, effectiveDisplayMode.value, key, isMac.value)
            }
            return key
          })

          // Add sequence separator if not the last group
          if (groupIndex < sequenceGroups.length - 1) {
            result.push(THEN_DELINEATOR)
          }

          return result
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
              ? applyDisplayModeToKey(mergeDeep(hotkeyMap, props.keyMap), 'text', String(key[1]), isMac.value)[1]
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
      if (effectiveDisplayMode.value === 'text') return undefined

      const textKey = getKeyText(effectiveKeyMap.value, String(key[2]), isMac.value)
      return translateKey(textKey)
    }

    function renderKey (key: Key, keyIndex: number, isContained: boolean) {
      const KeyComponent = isContained ? 'kbd' : VKbd
      const keyClasses = [
        'v-hotkey__key',
        `v-hotkey__key-${key[0]}`,
        ...(isContained ? ['v-hotkey__key--nested'] : [
          borderClasses.value,
          roundedClasses.value,
          elevationClasses.value,
          colorClasses.value,
        ]),
      ]

      return (
        <KeyComponent
          key={ keyIndex }
          class={ keyClasses }
          style={ isContained ? undefined : colorStyles.value }
          aria-hidden="true"
          title={ getKeyTooltip(key) }
        >
          {
            key[0] === 'icon' ? (
              <VIcon
                icon={ key[1] }
                aria-hidden="true"
              />
            ) : translateKey(key[1])
          }
        </KeyComponent>
      )
    }

    function renderDivider (key: Delineator, keyIndex: number) {
      return (
        <span
          key={ keyIndex }
          class="v-hotkey__divider"
          aria-hidden="true"
        >
          {
            AND_DELINEATOR.isEqual(key) ? '+' : t('$vuetify.hotkey.then')
          }
        </span>
      )
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
          <VKbd
            key="contained"
            class={[
              'v-hotkey__contained-wrapper',
              borderClasses.value,
              roundedClasses.value,
              elevationClasses.value,
              colorClasses.value,
            ]}
            style={ colorStyles.value }
            aria-hidden="true"
          >
            { props.prefix && (
              <span key="contained-prefix" class="v-hotkey__prefix">{ props.prefix }</span>
            )}
            { keyCombinations.value.map((combination, comboIndex) => (
              <span class="v-hotkey__combination" key={ comboIndex }>
                { combination.map((key, keyIndex) =>
                  isDelineator(key)
                    ? renderDivider(key, keyIndex)
                    : renderKey(key, keyIndex, true)
                )}
                { comboIndex < keyCombinations.value.length - 1 && <span aria-hidden="true">&nbsp;</span> }
              </span>
            ))}
            { props.suffix && (
              <span key="contained-suffix" class="v-hotkey__suffix">{ props.suffix }</span>
            )}
          </VKbd>
        ) : (
          <>
            { props.prefix && (
              <span key="prefix" class="v-hotkey__prefix">{ props.prefix }</span>
            )}
            { keyCombinations.value.map((combination, comboIndex) => (
              <span class="v-hotkey__combination" key={ comboIndex }>
                { combination.map((key, keyIndex) =>
                  isDelineator(key)
                    ? renderDivider(key, keyIndex)
                    : renderKey(key, keyIndex, false)
                )}
                { comboIndex < keyCombinations.value.length - 1 && <span aria-hidden="true">&nbsp;</span> }
              </span>
            ))}
            { props.suffix && (
              <span key="suffix" class="v-hotkey__suffix">{ props.suffix }</span>
            )}
          </>
        )}
      </div>
    ))
  },
})

export type VHotkey = InstanceType<typeof VHotkey>

export type { KeyConfig, PlatformKeyConfig, KeyMapConfig, DisplayMode }
