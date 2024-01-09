// Utilities
import { h, mergeProps, Transition } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { Component, FunctionalComponent, PropType, TransitionProps } from 'vue'

export const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object] as PropType<string | boolean | TransitionProps & { component?: Component }>,
    default: 'fade-transition',
    validator: val => val !== true,
  },
}, 'transition')

interface MaybeTransitionProps extends TransitionProps {
  transition?: string | boolean | TransitionProps & { component?: any }
  disabled?: boolean
}

export const MaybeTransition: FunctionalComponent<MaybeTransitionProps> = (props, { slots }) => {
  const { transition, disabled, ...rest } = props

  const { component = Transition, ...customProps } = typeof transition === 'object' ? transition : {}

  return h(
    component,
    mergeProps(typeof transition === 'string'
      ? { name: disabled ? '' : transition }
      : customProps as any,
    rest as any,
    { disabled }),
    slots
  )
}
