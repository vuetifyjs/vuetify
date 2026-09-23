// Styles
import './VCounter.sass'

// Components
import { VSlideYTransition } from '@/components/transitions'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { shallowRef, toRef, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Component } from 'vue'

export const makeVCounterProps = propsFactory({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0,
  },

  ...makeComponentProps(),
  ...makeTransitionProps({
    transition: { component: VSlideYTransition as Component },
  }),
}, 'VCounter')

export type VCounterSlot = {
  counter: string
  max: string | number | undefined
  value: string | number | undefined
}

type VCounterSlots = {
  default: VCounterSlot
}

export const VCounter = genericComponent<VCounterSlots>()({
  name: 'VCounter',

  functional: true,

  props: makeVCounterProps(),

  setup (props, { slots }) {
    const lastMax = shallowRef(props.max) // to show limit until it slides out
    watch(() => props.max, val => val != null && (lastMax.value = val))
    const max = toRef(() => props.active ? props.max : lastMax.value)

    const counter = toRef(() => {
      return max.value ? `${props.value} / ${max.value}` : String(props.value)
    })

    useRender(() => (
      <MaybeTransition transition={ props.transition } appear>
        <div
          v-show={ props.active }
          class={[
            'v-counter',
            {
              'text-error': max.value && !props.disabled &&
                parseFloat(props.value) > parseFloat(max.value),
            },
            props.class,
          ]}
          style={ props.style }
        >
          { slots.default
            ? slots.default({
              counter: counter.value,
              max: max.value,
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
