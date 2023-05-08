// Styles
import './VCounter.sass'

// Components
import { VSlideYTransition } from '@/components/transitions'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { computed } from 'vue'
import { genericComponent, useRender } from '@/util'

export const VCounter = genericComponent()({
  name: 'VCounter',

  functional: true,

  props: {
    active: Boolean,
    max: [Number, String],
    value: {
      type: [Number, String],
      default: 0,
    },

    ...makeComponentProps(),
    ...makeTransitionProps({
      transition: { component: VSlideYTransition },
    }),
  },

  setup (props, { slots }) {
    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value)
    })

    useRender(() => (
      <MaybeTransition transition={ props.transition }>
        <div
          v-show={ props.active }
          class={[
            'v-counter',
            props.class,
          ]}
          style={ props.style }
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
    ))

    return {}
  },
})

export type VCounter = InstanceType<typeof VCounter>
