// Styles
import './VHotKey.scss'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeDensityProps, useDensity } from '@/composables/density' // For potential dense prop

// Utilities
import { computed, toRef } from 'vue' // Added toRef
import { genericComponent, propsFactory, useRender } from '@/util'
// import { parseTrigger } from '../../useKeyBindings' // Removed import
import { IS_MAC } from '../../platform' // To display platform-specific modifiers

export const makeVHotKeyProps = propsFactory({
  hotkey: {
    type: String,
    required: true,
  },
  // dense: Boolean, // Removed custom dense prop, rely on density from makeDensityProps

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

    const keysToRender = computed(() => {
      const rawKeys = props.hotkey.split('+').map(k => k.trim().toLowerCase());

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

      // Deduplicate and sort modifiers based on displayOrder
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
        // Display mapping logic from previous attempt remains valid here
        if (IS_MAC && key === 'meta') return '⌘';
        if (!IS_MAC && key === 'meta') return 'Ctrl';
        if (key === 'ctrl') return 'Ctrl'; // This handles explicit 'ctrl' or normalized 'meta' on non-Mac
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
        aria-label={`Hotkey: ${props.hotkey}`} // Provides an accessible label
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
