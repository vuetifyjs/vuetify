// Utilities
import { propsFactory } from '@/util'

// Types
import type { PropType, TransitionProps } from 'vue'

export const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object] as PropType<string | false | TransitionProps>,
    default: 'fade-transition',
    validator: val => val !== true,
  },
}, 'transition')
