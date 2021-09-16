// Styles
import './VCounter.sass'

// Components
import { VSlideYTransition } from '@/components/transitions'

// Utilities
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { computed, defineComponent } from 'vue'

export const VCounter = defineComponent({
  name: 'VCounter',

  functional: true,

  props: {
    active: Boolean,
    max: [Number, String],
    value: {
      type: [Number, String],
      default: 0,
    },

    ...makeTransitionProps({
      transition: { component: VSlideYTransition },
    }),
  },

  setup (props, { slots }) {
    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value)
    })

    return () => {
      return (
        <MaybeTransition transition={ props.transition }>
          <div
            v-show={ props.active }
            class="v-counter"
          >
            { slots.default
              ? slots.default({
                counter: counter.value,
                max: props.max,
                value: props.value,
              })
              : counter.value
            }
          </div>
        </MaybeTransition>
      )
    }
  },
})
