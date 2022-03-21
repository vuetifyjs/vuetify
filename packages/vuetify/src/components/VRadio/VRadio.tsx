// Components
import { VSelectionControl } from '@/components/VSelectionControl'

// Utility
import { defineComponent, useRender } from '@/util'

export const VRadio = defineComponent({
  name: 'VRadio',

  props: {
    falseIcon: {
      type: String,
      default: '$radioOff',
    },
    trueIcon: {
      type: String,
      default: '$radioOn',
    },
  },

  setup (props, { slots }) {
    useRender(() => (
      <VSelectionControl
        class="v-radio"
        trueIcon={ props.trueIcon }
        falseIcon={ props.falseIcon }
        type="radio"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VRadio = InstanceType<typeof VRadio>
