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
    active: Boolean,
    color: String,
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
    const items = computed(() => wrapInArray(props.value))
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
        { props.active && (
          items.value.map((item, i) => (
            <div
              class="v-messages__item"
              key={ `${i}-${items.value}` }
            >
              { slots.item ? slots.item({ item }) : item }
            </div>
          ))
        ) }
      </MaybeTransition>
    )
  },
})
