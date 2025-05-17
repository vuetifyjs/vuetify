// Styles
import './VHotKey.scss'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeDensityProps, useDensity } from '@/composables/density'
import { ActionCoreSymbol } from '@/labs/VActionCore'

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

    const internalHotkeyString = computed<string | undefined>(() => {
      if (props.actionId && actionCore) {
        // Ensure reactivity to allActions by accessing it here
        // The actual getAction will use the current value of allActions
        // No need to directly use actionCore.allActions.value in this line if getAction is inherently reactive to it,
        // but its presence in the computed scope helps Vue track dependency if actionCore itself or its methods are not fully reactive through injection.
        // However, getAction itself accesses actionCore.allActions.value, so this should be reactive.
        const action = actionCore.getAction(props.actionId);
        if (action?.hotkey) {
          return Array.isArray(action.hotkey) ? action.hotkey[0] : action.hotkey;
        } else if (action === undefined) {
          // Action not found yet, could be async. To prevent immediate fallback to props.hotkey if actionId is valid,
          // we might need a more sophisticated loading state or rely on nextTick approach previously used in watch.
          // For now, if action is undefined, and actionId was given, we assume it might appear.
          // If props.hotkey is also provided, it acts as an explicit override or initial value.
          // If action is found but no hotkey, then props.hotkey can be a fallback.
          // This logic prioritizes actionId if action is found.
          // If action not found, and props.hotkey exists, use props.hotkey.
          // console.warn(`[VHotKey] Action with id "${props.actionId}" not found. Falling back to explicit hotkey prop if available.`);
          return props.hotkey; // Fallback if action not (yet) found
        } else if (action && !action.hotkey) {
          // Action found but no hotkey, fallback to props.hotkey
          // console.warn(`[VHotKey] Action with id "${props.actionId}" has no hotkey defined. Falling back to explicit hotkey prop if available.`);
          return props.hotkey;
        }
      }
      return props.hotkey; // Default to props.hotkey if no actionId or actionCore
    });

    // Original watch logic removed as internalHotkeyString is now computed.
    // The computed property will handle changes to props.actionId, props.hotkey, and actionCore.allActions implicitly.

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
