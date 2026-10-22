// Styles
import './VCheckboxGroup.sass'

// Components
import { VCheckboxGroupSymbol } from '@/components/VCheckbox/VCheckbox'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VLabel } from '@/components/VLabel'
import { VSelectionControl } from '@/components/VSelectionControl'
import {
  makeSelectionControlGroupProps,
  VSelectionControlGroup,
  VSelectionControlGroupSymbol,
} from '@/components/VSelectionControlGroup/VSelectionControlGroup'

// Composables
import { injectNestedDefaults } from '@/composables/defaults'
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { inject, provide, shallowRef, toRef, useId } from 'vue'
import { filterInputAttrs, genericComponent, injectSelf, omit, propsFactory, useRender } from '@/util'

// Types
import type { VNode } from 'vue'
import type { VCheckbox } from '@/components/VCheckbox/VCheckbox'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { VSelectionGroupContext } from '@/components/VSelectionControlGroup/VSelectionControlGroup'
import type { GenericProps } from '@/util'

export type VCheckboxGroupSlots = Omit<VInputSlots, 'default'> & {
  default: never
  label: {
    label: string | undefined
    props: Record<string, any>
  }
}

export const makeVCheckboxGroupProps = propsFactory({
  ...omit(makeVInputProps(), ['direction', 'glow']),
  ...makeSelectionControlGroupProps({
    multiple: true,
    type: 'checkbox',
  }),
}, 'VCheckboxGroup')

export const VCheckboxGroup = genericComponent<new <T>(
  props: {
    modelValue?: T | null
    'onUpdate:modelValue'?: (value: T | null) => void
  },
  slots: VCheckboxGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VCheckboxGroup',

  inheritAttrs: false,

  props: makeVCheckboxGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:focused': (focused: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const uid = useId()
    const id = toRef(() => props.id || `checkbox-group-${uid}`)
    const model = useProxiedModel(props, 'modelValue')
    const { isFocused, focus, blur } = useFocus(props)
    const inputRef = shallowRef<VInput>()
    const controlGroupRef = shallowRef<VSelectionControlGroup>()

    const checkboxDefaults = injectNestedDefaults<VCheckbox['$props']>('VCheckbox')
    const selectionGroup = shallowRef<VSelectionGroupContext>()
    const parentGroups = inject(VCheckboxGroupSymbol, [])

    provide(VCheckboxGroupSymbol, [...parentGroups, selectionGroup])

    function onControlGroupBeforeMount (vnode: VNode) {
      selectionGroup.value = injectSelf(VSelectionControlGroupSymbol, vnode.component!)
    }

    function onFocusout (e: FocusEvent) {
      if (!(e.currentTarget as HTMLElement)?.contains(e.relatedTarget as Node)) {
        blur()
      }
    }

    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
      const inputProps = VInput.filterProps(props)
      const controlProps = VSelectionControl.filterProps(props)
      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label

      return (
        <VInput
          ref={ inputRef }
          class={[
            'v-checkbox-group',
            props.class,
          ]}
          style={ props.style }
          { ...rootAttrs }
          { ...inputProps }
          v-model={ model.value }
          id={ id.value }
          focused={ isFocused.value }
          onFocusin={ focus }
          onFocusout={ onFocusout }
        >
          {{
            ...slots,
            default: ({ messagesId, isDisabled, isReadonly, isValid }) => (
              <>
                { label && (
                  <VLabel id={ id.value }>
                    { label }
                  </VLabel>
                )}

                <VDefaultsProvider defaults={{ VCheckbox: { hideDetails: checkboxDefaults.value?.hideDetails ?? true } }}>
                  <VSelectionControlGroup
                    ref={ controlGroupRef }
                    { ...controlProps }
                    id={ id.value }
                    role="group"
                    aria-describedby={ messagesId.value }
                    aria-labelledby={ label ? id.value : undefined }
                    defaultsTarget="VCheckbox"
                    disabled={ isDisabled.value }
                    readonly={ isReadonly.value }
                    error={ isValid.value === false }
                    { ...controlAttrs }
                    v-model={ model.value }
                    onVnodeBeforeMount={ onControlGroupBeforeMount }
                    v-slots={ slots }
                  />
                </VDefaultsProvider>
              </>
            ),
          }}
        </VInput>
      )
    })

    return forwardRefs({ isFocused }, controlGroupRef, inputRef)
  },
})

export type VCheckboxGroup = InstanceType<typeof VCheckboxGroup>
