// Styles
import './VMessages.sass'

// Components
import { VSlideYTransition } from '@/components/transitions'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { defineComponent, wrapInArray } from '@/util'
import { computed } from 'vue'

export const VMessages = defineComponent({
  name: 'VMessages',

  props: {
    active: Boolean,
    value: {
      type: [Array, String],
      default: () => ([]),
    },

    ...makeTransitionProps({
      transition: {
        component: VSlideYTransition,
        group: true,
      },
    }),
  },

  setup (props, { slots }) {
    const messages = computed(() => wrapInArray(props.value))

    return () => (
      <MaybeTransition
        transition={ props.transition }
        tag="div"
        class="v-messages"
      >
        { (messages.value.length > 0 && props.active) && (
          messages.value.map((message, i) => (
            <div class="v-messages__message" key={ i }>
              { message }
            </div>
          ))
        ) }

        { slots?.default?.() }
      </MaybeTransition>
    )
  },
})
