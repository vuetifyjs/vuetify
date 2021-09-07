// Styles
import './VMessages.sass'

// Components
import { VSlideYTransition } from '@/components/transitions'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { defineComponent } from '@/util'

export const VMessages = defineComponent({
  name: 'VMessages',

  props: {
    active: Boolean,
    modelValue: {
      type: Array,
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
    return () => (
      <MaybeTransition
        transition={ props.transition }
        tag="div"
        class="v-messages"
      >
        { (props.modelValue.length > 0 && props.active) && (
          props.modelValue.map((message, i) => (
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
