// Utilities
import { h, mergeProps, Transition, TransitionGroup } from 'vue'
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
  group?: boolean
}

export const MaybeTransition: FunctionalComponent<MaybeTransitionProps> = (props, { slots }) => {
  const { transition, disabled, group, ...rest } = props

  const {
    component = group ? TransitionGroup : Transition,
    ...customProps
  } = typeof transition === 'object' ? transition : {}

  return h(
    component,
    mergeProps(
      typeof transition === 'string'
        ? { name: disabled ? '' : transition }
        : customProps as any,
      typeof transition === 'string'
        ? {}
        : Object.fromEntries(Object.entries({ disabled, group }).filter(([_, v]) => v !== undefined)),
      rest as any,
    ),
    slots
  )
}
