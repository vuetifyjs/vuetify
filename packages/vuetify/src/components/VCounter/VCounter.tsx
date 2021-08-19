// Styles
import './VCounter.sass'

// Utilities
import { defineComponent } from 'vue'

export const VCounter = defineComponent({
  name: 'VCounter',

  functional: true,

  props: {
    max: [Number, String],
    value: {
      type: [Number, String],
      default: undefined,
    },
  },

  setup (props, { slots }) {
    return () => {
      return (
        <div class="v-counter">
          { slots.default
            ? slots.default()
            : props.max ? `${props.value} / ${props.max}` : String(props.value)
          }
        </div>
      )
    }
  },
})
