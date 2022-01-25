// Styles
import './VMessages.sass'

// Components
import { VSlideYTransition } from '@/components/transitions'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useTextColor } from '@/composables/color'

// Utilities
import { defineComponent, wrapInArray } from '@/util'
import { computed } from 'vue'
import type { PropType } from 'vue'

export const VMessages = defineComponent({
  name: 'VMessages',

  props: {
    // TODO: change this to modelValue
    active: Boolean,
    color: String,
    // TODO: change to messages
    value: {
      type: [Array, String] as PropType<string | string[]>,
      default: () => ([]),
    },

    ...makeTransitionProps({
      transition: {
        component: VSlideYTransition,
        leaveAbsolute: true,
        group: true,
      },
    }),
  },

  setup (props, { slots }) {
    const messages = computed(() => wrapInArray(props.value))
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => props.color))

    return () => (
      <MaybeTransition
        transition={ props.transition }
        tag="div"
        class={[
          'v-messages',
          textColorClasses.value,
        ]}
        style={ textColorStyles.value }
      >
        { (messages.value.length > 0 && props.active) && (
          messages.value.map((message, i) => (
            <div class="v-messages__message" key={ `${i}-${messages.value}` }>
              { message }
            </div>
          ))
        ) }

        { slots?.default?.() }
      </MaybeTransition>
    )
  },
})
