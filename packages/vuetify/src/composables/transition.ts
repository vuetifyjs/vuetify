// Utilities
import { h, mergeProps, Transition, TransitionGroup } from 'vue'
import { isObject, propsFactory } from '@/util'

// Types
import type { Component, FunctionalComponent, Prop, TransitionProps } from 'vue'

export const makeTransitionProps = propsFactory({
  transition: {
    type: null,
    default: 'fade-transition',
    validator: val => val !== true,
  } as Prop<null | string | boolean | TransitionProps & { component?: Component }>,
}, 'transition')

interface MaybeTransitionProps extends TransitionProps {
  transition?: null | string | boolean | TransitionProps & { component?: any }
  disabled?: boolean
  group?: boolean
}

export const MaybeTransition: FunctionalComponent<MaybeTransitionProps> = (props, { slots }) => {
  const { transition, disabled, group, ...rest } = props

  const {
    component = group ? TransitionGroup : Transition,
    ...customProps
  } = isObject(transition) ? transition : {}

  let transitionProps
  if (isObject(transition)) {
    transitionProps = mergeProps(
      customProps,
      JSON.parse(JSON.stringify({ disabled, group })),
      rest,
    )
  } else {
    transitionProps = mergeProps(
      { name: disabled || !transition ? '' : transition },
      rest,
    )
  }

  return h(
    component,
    transitionProps,
    slots
  )
}
