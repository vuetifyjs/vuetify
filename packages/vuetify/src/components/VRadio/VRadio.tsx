// Components
import { VSelectionControl } from '@/components/VSelectionControl'

// Utility
import { defineComponent } from 'vue'
import { useRender } from '@/util'

export const VRadio = defineComponent({
  name: 'VRadio',

  props: {
    offIcon: {
      type: String,
      default: '$radioOff',
    },
    onIcon: {
      type: String,
      default: '$radioOn',
    },
  },

  setup (props, { slots }) {
    useRender(() => (
      <VSelectionControl
        class="v-radio"
        onIcon={ props.onIcon }
        offIcon={ props.offIcon }
        type="radio"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VRadio = InstanceType<typeof VRadio>
