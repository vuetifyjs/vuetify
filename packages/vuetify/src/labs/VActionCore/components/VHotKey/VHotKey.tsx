// Styles
import './VHotKey.scss'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { ActionCoreSymbol } from '@/labs/VActionCore'

// Utilities
import { computed, inject, nextTick, ref, watch } from 'vue'
import { IS_MAC } from '../../platform'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVHotKeyProps = propsFactory({
  hotkey: String,
  actionId: String,
  displayMode: {
    type: String as () => 'symbol' | 'text',
    default: 'symbol' as const,
  },

  ...makeComponentProps(),
  ...makeTagProps({ tag: 'div' }),
  ...makeThemeProps(),
  ...makeDensityProps(),
}, 'VHotKey')

export const VHotKey = genericComponent()({
  name: 'VHotKey',
  props: makeVHotKeyProps(),
  setup (props, { slots }) {
    provideTheme(props)
    const { densityClasses } = useDensity(props, 'v-hot-key')
    const actionCore = props.actionId ? inject(ActionCoreSymbol, null) : null

    const internalHotkeyString = computed<string | undefined>(() => {
      if (props.actionId && actionCore) {
        // Ensure reactivity to allActions by accessing it here
        // The actual getAction will use the current value of allActions
        // No need to directly use actionCore.allActions.value in this line if getAction is inherently reactive to it,
        // but its presence in the computed scope helps Vue track dependency if actionCore itself or its methods are not fully reactive through injection.
        // However, getAction itself accesses actionCore.allActions.value, so this should be reactive.
        const action = actionCore.getAction(props.actionId)
        if (action?.hotkey) {
          return Array.isArray(action.hotkey) ? action.hotkey[0] : action.hotkey
        } else if (action === undefined) {
          // Action not found yet, could be async. To prevent immediate fallback to props.hotkey if actionId is valid,
          // we might need a more sophisticated loading state or rely on nextTick approach previously used in watch.
          // For now, if action is undefined, and actionId was given, we assume it might appear.
          // If props.hotkey is also provided, it acts as an explicit override or initial value.
          // If action is found but no hotkey, then props.hotkey can be a fallback.
          // This logic prioritizes actionId if action is found.
          // If action not found, and props.hotkey exists, use props.hotkey.
          // console.warn(`[VHotKey] Action with id "${props.actionId}" not found. Falling back to explicit hotkey prop if available.`);
          return props.hotkey // Fallback if action not (yet) found
        } else if (action && !action.hotkey) {
          // Action found but no hotkey, fallback to props.hotkey
          // console.warn(`[VHotKey] Action with id "${props.actionId}" has no hotkey defined. Falling back to explicit hotkey prop if available.`);
          return props.hotkey
        }
      }
      return props.hotkey // Default to props.hotkey if no actionId or actionCore
    })

    // The computed property will handle changes to props.actionId, props.hotkey, and actionCore.allActions implicitly.
    const keysToRender = computed(() => {
      const hotkeyToParse = internalHotkeyString.value
      if (!hotkeyToParse) return []

      // Use a regex to better split while preserving sequences like '-'
      // This simple split by '+' assumes modifiers are always joined by '+'
      // and sequences are not mixed with combinations in a single hotkey string segment handled by VHotKey.
      // VHotKey is designed for single combination display primarily.
      const rawKeys = hotkeyToParse.split('+').map(k => k.trim().toLowerCase())

      const modifierDisplayOrder = ['meta', 'ctrl', 'alt', 'shift']
      const metaAliases = ['meta', 'cmd', 'command', 'super', 'win', 'windows', 'cmdorctrl', 'primary']
      const ctrlAliases = ['ctrl', 'control']
      const altAliases = ['alt', 'option']
      const shiftAliases = ['shift']

      // Updated list to include 'k' and other common letters for this heuristic
      const commonMacCtrlAsMetaKeys = ['a', 'c', 'f', 'k', 'n', 'o', 'p', 'q', 's', 't', 'v', 'w', 'x', 'z']

      const modifiers: string[] = []
      const mainKeys: string[] = []

      rawKeys.forEach(key => {
        if (metaAliases.includes(key)) modifiers.push('meta')
        else if (ctrlAliases.includes(key)) modifiers.push('ctrl')
        else if (altAliases.includes(key)) modifiers.push('alt')
        else if (shiftAliases.includes(key)) modifiers.push('shift')
        else mainKeys.push(key)
      })

      const uniqueSortedModifiers = [...new Set(modifiers)].sort((a, b) => {
        const indexA = modifierDisplayOrder.indexOf(a)
        const indexB = modifierDisplayOrder.indexOf(b)
        if (indexA === -1 && indexB === -1) return 0
        if (indexA === -1) return 1
        if (indexB === -1) return -1
        return indexA - indexB
      })

      let displayModifiers = [...uniqueSortedModifiers]
      const hasCtrl = uniqueSortedModifiers.includes('ctrl')
      const hasMeta = uniqueSortedModifiers.includes('meta')
      const hasAlt = uniqueSortedModifiers.includes('alt')

      // Corrected Heuristic: On Mac, if 'ctrl' is the *only* modifier present
      // (and 'meta' is not already there from an alias), and it's a common command key,
      // then display 'ctrl' as 'meta' (⌘).
      const canConsiderCtrlAsMeta = hasCtrl && !hasMeta && !hasAlt && uniqueSortedModifiers.length === 1

      if (IS_MAC && canConsiderCtrlAsMeta && mainKeys.length === 1 && commonMacCtrlAsMetaKeys.includes(mainKeys[0])) {
        displayModifiers = uniqueSortedModifiers.map(m => m === 'ctrl' ? 'meta' : m)
        // Re-sort is important if 'meta' was introduced and its order might change relative to (now non-existent) others.
        // However, since canConsiderCtrlAsMeta implies uniqueSortedModifiers was just ['ctrl'], displayModifiers will become ['meta']. Sort is trivial but harmless.
        displayModifiers.sort((a, b) => modifierDisplayOrder.indexOf(a) - modifierDisplayOrder.indexOf(b))
      }

      // Filter out duplicate 'meta' if 'ctrl' was converted but 'meta' was already present (e.g. from 'cmdorctrl')
      // This check might be redundant if the canConsiderCtrlAsMeta already ensures !hasMeta from uniqueSortedModifiers.
      if (displayModifiers.filter(m => m === 'meta').length > 1) {
        const firstMetaIndex = displayModifiers.indexOf('meta')
        displayModifiers = displayModifiers.filter((m, index) => m !== 'meta' || index === firstMetaIndex)
      }

      return [...new Set(displayModifiers), ...mainKeys].map(key => {
        let text = key
        let label = key

        if (key === 'meta') {
          if (IS_MAC) {
            text = props.displayMode === 'symbol' ? '⌘' : 'Command'
            label = 'Command'
          } else {
            text = props.displayMode === 'symbol' ? 'Ctrl' : 'Control'
            label = 'Control'
          }
        } else if (key === 'ctrl') {
          text = props.displayMode === 'symbol' ? 'Ctrl' : 'Control'
          label = 'Control'
        } else if (key === 'alt') {
          if (IS_MAC) {
            text = props.displayMode === 'symbol' ? '⌥' : 'Option'
            label = 'Option'
          } else {
            text = 'Alt'
            label = 'Alt'
          }
        } else if (key === 'shift') {
          text = 'Shift'
          label = 'Shift'
        } else if (key === 'arrowup') {
          text = props.displayMode === 'symbol' ? '↑' : 'Up Arrow'
          label = 'Up Arrow'
        } else if (key === 'arrowdown') {
          text = props.displayMode === 'symbol' ? '↓' : 'Down Arrow'
          label = 'Down Arrow'
        } else if (key === 'arrowleft') {
          text = props.displayMode === 'symbol' ? '←' : 'Left Arrow'
          label = 'Left Arrow'
        } else if (key === 'arrowright') {
          text = props.displayMode === 'symbol' ? '→' : 'Right Arrow'
          label = 'Right Arrow'
        } else if (key === 'enter') {
          text = 'Enter'; label = 'Enter'
        } else if (key === 'escape') {
          text = 'Esc'; label = 'Escape'
        } else if (key === 'backspace') {
          text = 'Backspace'; label = 'Backspace'
        } else if (key === 'delete') {
          text = 'Del'; label = 'Delete'
        } else if (key === 'tab') {
          text = 'Tab'; label = 'Tab'
        } else if (key === 'space') {
          text = 'Space'; label = 'Space'
        } else if (/^f[1-9][0-2]?$/.test(key)) {
          text = key.toUpperCase()
          label = key.toUpperCase()
        } else {
          text = key.length === 1 ? key.toUpperCase() : key
          label = key.length === 1 ? key.toUpperCase() : key
        }
        return { text, label }
      })
    })

    useRender(() => (
      <props.tag
        class={[
          'v-hot-key',
          densityClasses.value,
          props.class,
        ]}
        style={ props.style }
        role="group"
        aria-label={ `Hotkey: ${internalHotkeyString.value || 'none'}` }
      >
        { slots.default ? slots.default() : keysToRender.value.map((keyPart, index) => (
          // Using index for key here is acceptable as order won't change for a given hotkey
          <span key={ index } class="v-hot-key__item">
            <kbd
              class="v-hot-key__key"
              aria-label={ props.displayMode === 'symbol' && keyPart.text !== keyPart.label ? keyPart.label : undefined }
            >
              { keyPart.text }
            </kbd>
          </span>
        ))}
      </props.tag>
    ))

    return {}
  },
})

export type VHotKey = InstanceType<typeof VHotKey>
