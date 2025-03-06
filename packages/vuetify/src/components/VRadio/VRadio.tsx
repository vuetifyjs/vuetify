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
    useRender(() => {
      const controlProps = VSelectionControl.filterProps(props)

      return (
        <VSelectionControl
          { ...controlProps }
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
