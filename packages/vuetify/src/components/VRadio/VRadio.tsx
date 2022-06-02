// Components
import { VSelectionControl } from '@/components/VSelectionControl'

// Composables
import { IconValue } from '@/composables/icons'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VRadio = defineComponent({
  name: 'VRadio',

  props: {
    falseIcon: {
      type: IconValue,
      default: '$radioOff',
    },
    trueIcon: {
      type: IconValue,
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
