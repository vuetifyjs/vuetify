// Components
import { makeVSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'

export const makeVRadioProps = propsFactory({
  ...makeVSelectionControlProps({
    falseIcon: '$radioOff',
    trueIcon: '$radioOn',
  }),
}, 'VRadio')

export const VRadio = genericComponent<VSelectionControlSlots>()({
  name: 'VRadio',

  props: makeVRadioProps(),

  setup (props, { slots }) {
    useRender(() => (
      <VSelectionControl
        { ...props }
        class={[
          'v-radio',
        ]}
        type="radio"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VRadio = InstanceType<typeof VRadio>
