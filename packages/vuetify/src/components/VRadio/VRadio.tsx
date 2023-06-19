// Components
import { makeSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'

export const makeVRadioProps = propsFactory({
  ...makeSelectionControlProps({
    falseIcon: '$radioOff',
    trueIcon: '$radioOn',
  }),
}, 'v-radio')

export const VRadio = genericComponent<VSelectionControlSlots>()({
  name: 'VRadio',

  props: makeVRadioProps(),

  setup (props, { slots }) {
    useRender(() => (
      <VSelectionControl
        { ...props }
        class={[
          'v-radio',
          props.class,
        ]}
        style={ props.style }
        type="radio"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VRadio = InstanceType<typeof VRadio>
