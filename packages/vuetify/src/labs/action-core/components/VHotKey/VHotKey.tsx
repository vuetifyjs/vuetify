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
            await nextTick()
            const retryAction = actionCore.getAction(newActionId)
            if (retryAction?.hotkey) {
              internalHotkeyString.value = Array.isArray(retryAction.hotkey) ? retryAction.hotkey[0] : retryAction.hotkey;
            } else {
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
        let text = key;
        let label = key;

        if (key === 'meta') {
          if (IS_MAC) {
            text = props.displayMode === 'symbol' ? '⌘' : 'Command';
            label = 'Command';
          } else {
            text = props.displayMode === 'symbol' ? 'Ctrl' : 'Control';
            label = 'Control';
          }
        } else if (key === 'ctrl') {
          text = props.displayMode === 'symbol' ? 'Ctrl' : 'Control';
          label = 'Control';
        } else if (key === 'alt') {
          if (IS_MAC) {
            text = props.displayMode === 'symbol' ? '⌥' : 'Option';
            label = 'Option';
          } else {
            text = 'Alt'; // No common symbol, 'Alt' is fine for text too
            label = 'Alt';
          }
        } else if (key === 'shift') {
          text = 'Shift'; // No common symbol, 'Shift' is fine for text too
          label = 'Shift';
        } else if (key === 'arrowup') {
          text = props.displayMode === 'symbol' ? '↑' : 'Up Arrow';
          label = 'Up Arrow';
        } else if (key === 'arrowdown') {
          text = props.displayMode === 'symbol' ? '↓' : 'Down Arrow';
          label = 'Down Arrow';
        } else if (key === 'arrowleft') {
          text = props.displayMode === 'symbol' ? '←' : 'Left Arrow';
          label = 'Left Arrow';
        } else if (key === 'arrowright') {
          text = props.displayMode === 'symbol' ? '→' : 'Right Arrow';
          label = 'Right Arrow';
        } else if (key === 'enter') {
          text = 'Enter'; label = 'Enter';
        } else if (key === 'escape') {
          text = 'Esc'; label = 'Escape';
        } else if (key === 'backspace') {
          text = 'Backspace'; label = 'Backspace';
        } else if (key === 'delete') {
          text = 'Del'; label = 'Delete';
        } else if (key === 'tab') {
          text = 'Tab'; label = 'Tab';
        } else if (key === 'space') {
          text = 'Space'; label = 'Space';
        } else if (/^f[1-9][0-2]?$/.test(key)) {
          text = key.toUpperCase();
          label = key.toUpperCase();
        } else {
          text = key.length === 1 ? key.toUpperCase() : key;
          label = key.length === 1 ? key.toUpperCase() : key;
        }
        return { text, label };
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
        role="group"
        aria-label={`Hotkey: ${internalHotkeyString.value || 'none'}`}
      >
        {slots.default ? slots.default() : keysToRender.value.map((keyPart, index) => (
          // Using index for key here is acceptable as order won't change for a given hotkey
          <span key={index} class="v-hot-key__item">
            <kbd
              class="v-hot-key__key"
              aria-label={props.displayMode === 'symbol' && keyPart.text !== keyPart.label ? keyPart.label : undefined}
            >
              {keyPart.text}
            </kbd>
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
