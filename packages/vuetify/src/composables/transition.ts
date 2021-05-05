// Utilities
import { h, mergeProps, Transition } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { FunctionalComponent, PropType, TransitionProps } from 'vue'

export const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object] as PropType<string | false | TransitionProps>,
    default: 'fade-transition',
    validator: val => val !== true,
  },
}, 'transition')

interface MaybeTransitionProps extends TransitionProps {
  transition?: string | boolean | TransitionProps
}

export const MaybeTransition: FunctionalComponent<MaybeTransitionProps> = (props, { slots }) => {
  const { transition, ...rest } = props

  if (!props.transition || typeof props.transition === 'boolean') return slots.default?.()

  return h(
    Transition,
    mergeProps(typeof props.transition === 'string' ? { name: props.transition } : props.transition as any, rest as any),
    slots
  )
}
