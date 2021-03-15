// Utilities
import { h, Transition } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
import type { TransitionProps, PropType, VNode } from 'vue'
import { consoleWarn } from '@/util/console'

type TransitionProp = string | boolean | TransitionProps

export const makeTransitionProps = propsFactory({
  transition: {
    type: [String, Boolean, Object] as PropType<TransitionProp>,
    validator: (value: any) => {
      return value !== true
    },
  },
}, 'transition')

export function withTransition <T extends VNode> (vnode: T, transition: TransitionProp) {
  // TODO: some way of checking if we have render context like withDirectives?

  if (transition === false) return vnode

  if (transition === true) {
    consoleWarn('`transition` prop does not accept value `true`')
    return vnode
  }

  const transitionProps = typeof transition === 'string' ? { name: transition } : transition

  return h(Transition, transitionProps, {
    default: () => vnode,
  })
}
