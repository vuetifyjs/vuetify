// Components
import { makeSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VRadio = defineComponent({
  name: 'VRadio',

  props: {
    ...makeSelectionControlProps({
      falseIcon: '$radioOff',
      trueIcon: '$radioOn',
    }),
  },

  setup (props, { slots }) {
    useRender(() => (
      <VSelectionControl
        { ...props }
        class="v-radio"
        type="radio"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VRadio = InstanceType<typeof VRadio>
