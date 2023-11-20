// Styles
import './VRadioGroup.sass'

// Components
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VLabel } from '@/components/VLabel'
import { VSelectionControl } from '@/components/VSelectionControl'
import { makeSelectionControlGroupProps, VSelectionControlGroup } from '@/components/VSelectionControlGroup/VSelectionControlGroup'

// Composables
import { IconValue } from '@/composables/icons'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { filterInputAttrs, genericComponent, getUid, omit, propsFactory, useRender } from '@/util'

// Types
import type { VInputSlots } from '@/components/VInput/VInput'
import type { GenericProps } from '@/util'

export type VRadioGroupSlots = Omit<VInputSlots, 'default'> & {
  default: never
  label: {
    label: string | undefined
    props: Record<string, any>
  }
}

export const makeVRadioGroupProps = propsFactory({
  height: {
    type: [Number, String],
    default: 'auto',
  },

  ...makeVInputProps(),
  ...omit(makeSelectionControlGroupProps(), ['multiple']),

  trueIcon: {
    type: IconValue,
    default: '$radioOn',
  },
  falseIcon: {
    type: IconValue,
    default: '$radioOff',
  },
  type: {
    type: String,
    default: 'radio',
  },
}, 'VRadioGroup')

export const VRadioGroup = genericComponent<new <T>(
  props: {
    modelValue?: T | null
    'onUpdate:modelValue'?: (value: T | null) => void
  },
  slots: VRadioGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VRadioGroup',

  inheritAttrs: false,

  props: makeVRadioGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { attrs, slots }) {
    const uid = getUid()
    const id = computed(() => props.id || `radio-group-${uid}`)
    const model = useProxiedModel(props, 'modelValue')

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
          class={[
            'v-radio-group',
            props.class,
          ]}
          style={ props.style }
          { ...rootAttrs }
          { ...inputProps }
          v-model={ model.value }
          id={ id.value }
        >
          {{
            ...slots,
            default: ({
              id,
              messagesId,
              isDisabled,
              isReadonly,
            }) => (
              <>
                { label && (
                  <VLabel id={ id.value }>
                    { label }
                  </VLabel>
                )}

                <VSelectionControlGroup
                  { ...controlProps }
                  id={ id.value }
                  aria-describedby={ messagesId.value }
                  defaultsTarget="VRadio"
                  trueIcon={ props.trueIcon }
                  falseIcon={ props.falseIcon }
                  type={ props.type }
                  disabled={ isDisabled.value }
                  readonly={ isReadonly.value }
                  aria-labelledby={ label ? id.value : undefined }
                  multiple={ false }
                  { ...controlAttrs }
                  v-model={ model.value }
                  v-slots={ slots }
                />
              </>
            ),
          }}
        </VInput>
      )
    })

    return {}
  },
})

export type VRadioGroup = InstanceType<typeof VRadioGroup>
