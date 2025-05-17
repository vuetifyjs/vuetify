// Styles
import './VHotKey.scss'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeDensityProps, useDensity } from '@/composables/density'
import { ActionCoreSymbol } from '@/labs/action-core'

// Utilities
import { computed, inject, ref, watch, nextTick } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'
import { IS_MAC } from '../../platform'

export const makeVHotKeyProps = propsFactory({
  hotkey: String,
  actionId: String,

  ...makeComponentProps(),
  ...makeTagProps({ tag: 'div' }), // Default tag, can be span or div
  ...makeThemeProps(),
  ...makeDensityProps(),
}, 'VHotKey')

export const VHotKey = genericComponent()({
  name: 'VHotKey',
  props: makeVHotKeyProps(),
  setup(props, { slots }) {
    provideTheme(props)
    const { densityClasses } = useDensity(props, 'v-hot-key')
    const actionCore = props.actionId ? inject(ActionCoreSymbol, null) : null

    const internalHotkeyString = ref<string | undefined>(props.hotkey)

    watch(() => props.actionId, async (newActionId) => {
      if (newActionId && actionCore) {
        const tryGetAction = async () => {
          const action = actionCore.getAction(newActionId)
          if (action?.hotkey) {
            internalHotkeyString.value = Array.isArray(action.hotkey) ? action.hotkey[0] : action.hotkey;
          } else if (action === undefined) {
            // Action not found yet, wait for next tick and try again
            await nextTick()
            const retryAction = actionCore.getAction(newActionId)
            if (retryAction?.hotkey) {
              internalHotkeyString.value = Array.isArray(retryAction.hotkey) ? retryAction.hotkey[0] : retryAction.hotkey;
            } else {
              // Fallback to explicit prop hotkey if provided
              internalHotkeyString.value = props.hotkey;
              console.warn(`[VHotKey] Action with id "${newActionId}" has no hotkey defined. Falling back to explicit hotkey prop if available.`)
            }
          } else {
            internalHotkeyString.value = props.hotkey;
          }
        }
        await tryGetAction()
      } else if (!newActionId) {
        internalHotkeyString.value = props.hotkey;
      }
    }, { immediate: true })

    watch(() => props.hotkey, (newHotkey) => {
      if (!props.actionId) {
        internalHotkeyString.value = newHotkey;
      }
    })

    const keysToRender = computed(() => {
      const hotkeyToParse = internalHotkeyString.value;
      if (!hotkeyToParse) return [];

      const rawKeys = hotkeyToParse.split('+').map(k => k.trim().toLowerCase());

      // Order for sorting modifiers display
      const modifierDisplayOrder = ['meta', 'ctrl', 'alt', 'shift'];
      // Aliases that should be treated as 'meta' internally for platform checks
      const metaAliases = ['meta', 'cmd', 'command', 'super', 'win', 'windows', 'cmdorctrl'];
      // Aliases for ctrl
      const ctrlAliases = ['ctrl', 'control'];
      // Aliases for alt
      const altAliases = ['alt', 'option'];
      // Aliases for shift
      const shiftAliases = ['shift'];

      const modifiers: string[] = [];
      const mainKeys: string[] = [];

      rawKeys.forEach(key => {
        if (metaAliases.includes(key)) modifiers.push('meta');
        else if (ctrlAliases.includes(key)) modifiers.push('ctrl');
        else if (altAliases.includes(key)) modifiers.push('alt');
        else if (shiftAliases.includes(key)) modifiers.push('shift');
        else mainKeys.push(key);
      });

      const uniqueSortedModifiers = [...new Set(modifiers)].sort((a, b) => {
        // Ensure consistent sort order even if one is not in displayOrder (should not happen with current logic)
        const indexA = modifierDisplayOrder.indexOf(a);
        const indexB = modifierDisplayOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return 0; // both not found, keep order
        if (indexA === -1) return 1; // a not found, b comes first
        if (indexB === -1) return -1; // b not found, a comes first
        return indexA - indexB;
      });

      return [...uniqueSortedModifiers, ...mainKeys].map(key => {
        if (IS_MAC && key === 'meta') return '⌘';
        if (!IS_MAC && key === 'meta') return 'Ctrl';
        if (key === 'ctrl') return 'Ctrl';
        if (key === 'alt') return 'Alt';
        if (key === 'shift') return 'Shift';

        if (key === 'arrowup') return '↑';
        if (key === 'arrowdown') return '↓';
        if (key === 'arrowleft') return '←';
        if (key === 'arrowright') return '→';
        if (key === 'enter') return 'Enter';
        if (key === 'escape') return 'Esc';
        if (key === 'backspace') return 'Backspace';
        if (key === 'delete') return 'Del';
        if (key === 'tab') return 'Tab';
        if (key === 'space') return 'Space';
        if (/^f[1-9][0-2]?$/.test(key)) return key.toUpperCase();

        return key.length === 1 ? key.toUpperCase() : key;
      });
    })

    useRender(() => (
      <props.tag
        class={[
          'v-hot-key',
          densityClasses.value,
          props.class,
        ]}
        style={props.style}
        role="group" // Indicates a group of related elements
        aria-label={`Hotkey: ${internalHotkeyString.value || 'none'}`} // Provides an accessible label
      >
        {slots.default ? slots.default() : keysToRender.value.map((keyPart, index) => (
          // Using index for key here is acceptable as order won't change for a given hotkey
          <span key={index} class="v-hot-key__item">
            <kbd class="v-hot-key__key">{keyPart}</kbd>
            {index < keysToRender.value.length - 1 && (
              <span class="v-hot-key__separator" aria-hidden="true">+</span>
            )}
          </span>
        ))}
      </props.tag>
    ))

    return {}
  },
})

export type VHotKey = InstanceType<typeof VHotKey>
