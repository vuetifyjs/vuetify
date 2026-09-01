// Components
import { makeVSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { ref } from 'vue'
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
    const controlRef = ref<VSelectionControl>()

    useRender(() => {
      const controlProps = VSelectionControl.filterProps(props)

      return (
        <VSelectionControl
          ref={ controlRef }
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

    return forwardRefs({}, controlRef)
  },
})

export type VRadio = InstanceType<typeof VRadio>
