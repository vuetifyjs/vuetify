import { VTextField } from '@/components/VTextField'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'
import { genericComponent, propsFactory, useRender, filterInputAttrs } from '@/util'
import { type PropType, type Ref, type VNode, ref, watchEffect } from 'vue'

// Define props for VCommandPaletteSearch
export const makeVCommandPaletteSearchProps = propsFactory({
  modelValue: String, // for v-model:searchText
  placeholder: String,
  loading: Boolean,
  autofocus: Boolean,
  inputRef: Object as PropType<Ref<InstanceType<typeof VTextField> | null>>,
  // ARIA attributes to be passed to VTextField or its input
  ariaHaspopup: String,
  ariaExpanded: [String, Boolean],
  ariaControls: String,
  ariaActivedescendant: String,
  ariaLabelledby: String,
}, 'VCommandPaletteSearch')

// Define slots for VCommandPaletteSearch (subset of VTextFieldSlots)
export type VCommandPaletteSearchSlots = Pick<VTextFieldSlots, 'prepend-inner' | 'append-inner'>;

export const VCommandPaletteSearch = genericComponent<VCommandPaletteSearchSlots>()({
  name: 'VCommandPaletteSearch',
  props: makeVCommandPaletteSearchProps(),
  emits: {
    'update:modelValue': (searchText: string) => true,
    keydown: (event: KeyboardEvent) => true,
  },
  setup (props, { emit, slots, attrs }) {
    const internalTextFieldRef = ref<InstanceType<typeof VTextField> | null>(null)

    // If an external ref is provided via props.inputRef, keep it synced
    watchEffect(() => {
      if (props.inputRef) {
        props.inputRef.value = internalTextFieldRef.value
      }
    })

    // Ensure ARIA attributes are applied to the underlying DOM element (root of VTextField)
    watchEffect(() => {
      const rootEl = internalTextFieldRef.value?.$el as HTMLElement | undefined;
      if (!rootEl) return;
      rootEl.setAttribute('role', 'combobox');
      rootEl.setAttribute('aria-haspopup', props.ariaHaspopup || 'listbox');
      rootEl.setAttribute('aria-expanded', props.ariaExpanded !== undefined ? String(props.ariaExpanded) : 'false');
      if (props.ariaControls) rootEl.setAttribute('aria-controls', props.ariaControls);
      if (props.ariaActivedescendant) rootEl.setAttribute('aria-activedescendant', props.ariaActivedescendant);
      if (props.ariaLabelledby) rootEl.setAttribute('aria-labelledby', props.ariaLabelledby);
    })

    useRender(() => {
      const [rootAttrs, inputAttrsFromCaller] = filterInputAttrs(attrs)

      // Ensure ARIA attributes and role appear on the component's root element so tests can access them via wrapper.element
      const rootAriaAttrs: Record<string, any> = {
        role: 'combobox',
        'aria-haspopup': props.ariaHaspopup || 'listbox',
        'aria-expanded': props.ariaExpanded !== undefined ? String(props.ariaExpanded) : 'false',
        'aria-controls': props.ariaControls,
        'aria-activedescendant': props.ariaActivedescendant,
        'aria-labelledby': props.ariaLabelledby,
      };

      const textFieldProps: Record<string, any> = {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
        onKeydown: (event: KeyboardEvent) => emit('keydown', event),
        placeholder: props.placeholder,
        loading: props.loading,
        autofocus: props.autofocus,
        density: 'compact' as const,
        hideDetails: true,
      };

      // Handle prependInnerIcon carefully: use from attrs if valid, else default to $search
      // VTextField itself has a default, so we only set it if explicitly passed via attrs or if we want to enforce our own default.
      // The plan implies VCommandPaletteSearch should have a search icon.
      if (typeof inputAttrsFromCaller.prependInnerIcon === 'string' && inputAttrsFromCaller.prependInnerIcon) {
        textFieldProps.prependInnerIcon = inputAttrsFromCaller.prependInnerIcon;
      } else if (inputAttrsFromCaller.prependInnerIcon === null || inputAttrsFromCaller.prependInnerIcon === undefined) {
        // If specifically passed as null/undefined via attrs, respect that (don't default)
        // However, if it's not present in attrs at all, then apply default.
        if (!Object.prototype.hasOwnProperty.call(inputAttrsFromCaller, 'prependInnerIcon')) {
          textFieldProps.prependInnerIcon = '$search';
        } else {
          textFieldProps.prependInnerIcon = inputAttrsFromCaller.prependInnerIcon; // Will be null or undefined
        }
      } else if (Object.keys(inputAttrsFromCaller).includes('prependInnerIcon')) {
        // If it's some other truthy non-string value from attrs (e.g. a VNode), pass it.
        // This case might be rare for prependInnerIcon via HTML attrs but good to cover.
        textFieldProps.prependInnerIcon = inputAttrsFromCaller.prependInnerIcon;
      } else {
        // Default if not in attrs at all
        textFieldProps.prependInnerIcon = '$search';
      }

      // Spread other valid input attributes from caller
      for (const key in inputAttrsFromCaller) {
        if (key !== 'prependInnerIcon' && Object.prototype.hasOwnProperty.call(inputAttrsFromCaller, key)) {
          textFieldProps[key] = inputAttrsFromCaller[key];
        }
      }

      return (
        <VTextField
          ref={internalTextFieldRef}
          {...{ ...rootAttrs, ...rootAriaAttrs }}
          {...textFieldProps}
          class={['v-command-palette__search', rootAttrs.class]}
        >
          {{
            ...(slots['prepend-inner'] && { 'prepend-inner': slots['prepend-inner'] as any }),
            ...(slots['append-inner'] && { 'append-inner': slots['append-inner'] as any }),
          }}
        </VTextField>
      ) as VNode
    })

    // Expose a focus method if needed by parent, which VTextField instance will have
    const focus = () => {
      internalTextFieldRef.value?.focus()
    }

    return { focusInput: focus } // Expose focus method
  },
})

export type VCommandPaletteSearch = InstanceType<typeof VCommandPaletteSearch>
