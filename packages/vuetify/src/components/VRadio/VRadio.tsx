// Components
import { makeVSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'
import type { GenericProps } from '@/util'

export const makeVRadioProps = propsFactory({
  ...omit(makeVSelectionControlProps({
    falseIcon: '$radioOff',
    trueIcon: '$radioOn',
  }), ['indeterminate', 'indeterminateIcon']),
}, 'VRadio')

export const VRadio = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VSelectionControlSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VRadio',

  props: makeVRadioProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')

    useRender(() => {
      const controlProps = omit(VSelectionControl.filterProps(props), ['modelValue'])

      return (
        <VSelectionControl
          { ...controlProps }
          v-model={ model.value }
          class={[
            'v-radio',
            props.class,
          ]}
          style={ props.style }
          type="radio"
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VRadio = InstanceType<typeof VRadio>
