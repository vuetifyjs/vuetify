// Components
import { makeVSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Utilities
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'

export const makeVRadioProps = propsFactory({
  ...omit(makeVSelectionControlProps({
    falseIcon: '$radioOff',
    trueIcon: '$radioOn',
  }), ['indeterminate', 'indeterminateIcon']),
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
